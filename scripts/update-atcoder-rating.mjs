import { writeFile } from "node:fs/promises";

const username = "marc2825";
const codeforcesHandle = "marc2825";

const endpoints = {
  atcoderAlgorithm: `https://atcoder.jp/users/${username}/history/json`,
  atcoderHeuristic: `https://atcoder.jp/users/${username}/history/json?contestType=heuristic`,
  codeforcesInfo: `https://codeforces.com/api/user.info?handles=${codeforcesHandle}`,
  codeforcesRating: `https://codeforces.com/api/user.rating?handle=${codeforcesHandle}`,
};

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "portfolio-competitive-programming-updater",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function summarizeAtCoderHistory(history) {
  const ratedHistory = history.filter(entry => entry.IsRated);

  if (!ratedHistory.length) {
    throw new Error("No rated contests found in AtCoder history.");
  }

  const latestRated = ratedHistory.at(-1);

  return {
    currentRating: latestRated.NewRating,
    highestRating: Math.max(...ratedHistory.map(entry => entry.NewRating)),
    lastRatedContest: latestRated.EndTime,
  };
}

function summarizeCodeforces(infoResponse, ratingResponse) {
  if (infoResponse.status !== "OK" || !infoResponse.result?.length) {
    throw new Error("Failed to fetch Codeforces user info.");
  }

  if (ratingResponse.status !== "OK") {
    throw new Error("Failed to fetch Codeforces rating history.");
  }

  const user = infoResponse.result[0];
  const lastRatedContest = ratingResponse.result?.length ? ratingResponse.result.at(-1) : null;

  return {
    currentRating: user.rating ?? null,
    highestRating: user.maxRating ?? user.rating ?? null,
    rank: user.rank ?? null,
    maxRank: user.maxRank ?? user.rank ?? null,
    lastRatedContest: lastRatedContest?.contestName ?? null,
    lastRatedContestTime: lastRatedContest
      ? new Date(lastRatedContest.ratingUpdateTimeSeconds * 1000).toISOString()
      : null,
  };
}

const [
  atcoderAlgorithmHistory,
  atcoderHeuristicHistory,
  codeforcesInfoResponse,
  codeforcesRatingResponse,
] = await Promise.all([
  fetchJson(endpoints.atcoderAlgorithm),
  fetchJson(endpoints.atcoderHeuristic),
  fetchJson(endpoints.codeforcesInfo),
  fetchJson(endpoints.codeforcesRating),
]);

const payload = {
  updatedAt: new Date().toISOString(),
  platforms: {
    atcoderAlgorithm: {
      username,
      ...summarizeAtCoderHistory(atcoderAlgorithmHistory),
      source: endpoints.atcoderAlgorithm,
    },
    atcoderHeuristic: {
      username,
      ...summarizeAtCoderHistory(atcoderHeuristicHistory),
      source: endpoints.atcoderHeuristic,
    },
    codeforces: {
      handle: codeforcesHandle,
      ...summarizeCodeforces(codeforcesInfoResponse, codeforcesRatingResponse),
      source: endpoints.codeforcesInfo,
      historySource: endpoints.codeforcesRating,
    },
  },
};

await writeFile(
  new URL("../database/atcoder.json", import.meta.url),
  `${JSON.stringify(payload, null, 2)}\n`
);

console.log(
  [
    `AtCoder Algo ${payload.platforms.atcoderAlgorithm.currentRating}`,
    `AtCoder Heuristic ${payload.platforms.atcoderHeuristic.currentRating}`,
    `Codeforces ${payload.platforms.codeforces.currentRating}`,
  ].join(" | ")
);

/* =========================================================
   data.js — All portfolio content & configuration
   ★ Edit only this file to update the entire site. ★
   Ordering rule: chronological lists are arranged from top (newest)
   to bottom (oldest).
   ========================================================= */


/* Reusable placeholder strings for unfinished labels/text. */
const WIP_EN = "(COMING SOON)";
const WIP_JP = "（準備中）";
const WIP_EMPTY = "";

/* ── Portfolio content ───────────────────────────────────── */
const DATA = {
  /* ── WIP flag ─────────────────────────────────── */
  wip: true,

  /* ── Homepage preview limits ──────────────────────────────
     Controls how many items are shown per section on index.html.
     Sub-pages (pages/*.html) always display all items regardless.

       n > 0  →  Show the n most recent items + "View All →" link
       0      →  Show all items (same as sub-page)
      -1      →  Show "Coming Soon..." (use to hide unpublished sections)
  ─────────────────────────────────────────────────────────── */
/* TODO: ピン留め機能*/
  preview: {
    research:  10,   /* research themes */
    papers:    10,   /* papers */
    projects:  10,   /* projects */
    articles:  -1,  /* articles */
    news:      10,  /* news items */
  },
  

  /* ── Meta ─────────────────────────────────────── */
  name:          "Masahiro Kono (Marc)",
  nameJP:        "河野 将大",
  heroLabel:     "Master's student",
  heroLabelJP:   "修士課程学生",
  affiliation:   "Department of Computer Science, Graduate School of Information Science and Technology · The University of Tokyo",
  affiliationJP: "情報理工学系研究科 コンピュータ科学専攻 · 東京大学 大学院",
  bio:           "My research lies in the design of <strong>creativity support tools</strong> and <strong>optimization methods for 2D and 3D computer graphics</strong>, with a particular interest in <strong>non-photorealistic rendering (NPR), discrete mathematics, DCC tools</strong>.",
  bioJP:         "<strong>2D・3DCG</strong>分野における情報科学技術を通じた<strong>制作支援や最適化</strong>、ならびに<strong>NPR（Non-Photorealistic Rendering）</strong>表現に特に関心があります。<strong>離散数学</strong>や<strong>DCCツール</strong>も好きです。",

  /* ── Links ────────────────────────────────────── */
  links: {
    email:    "marckono2825@gmail.com",
    emails:   [
      "marckono2825@gmail.com",
      "marckono2825@g.ecc.u-tokyo.ac.jp",
    ],
    cv:       "assets/MasahiroKono_CV.pdf",
    scholar:  "https://scholar.google.co.jp/citations?user=D-nvVksAAAAJ&hl=ja&oi=sra",
    github:   "https://github.com/marc2825",
    sketchfab:"https://sketchfab.com/marc2825",
    // twitter:  "",
    // linkedin: "",
    items: [
      {
        type: "file",
        label: "CV",
        labelJP: "CV",
        href: "assets/MasahiroKono_CV.pdf",
        showInAbout: true,
        showInContact: false,
      },
      {
        type: "scholar",
        label: "Scholar",
        labelJP: "Scholar",
        href: "https://scholar.google.co.jp/citations?user=D-nvVksAAAAJ&hl=ja&oi=sra",
        showInAbout: true,
        showInContact: true,
      },
      {
        type: "github",
        label: "GitHub",
        labelJP: "GitHub",
        href: "https://github.com/marc2825",
        showInAbout: true,
        showInContact: true,
      },
      {
        type: "sketchfab",
        label: "Sketchfab",
        labelJP: "Sketchfab",
        href: "https://sketchfab.com/marc2825",
        showInAbout: true,
        showInContact: true,
      },
      {
        type: "atcoder",
        label: "AtCoder",
        labelJP: "AtCoder",
        href: "https://atcoder.jp/users/marc2825",
        showInAbout: true,
        showInContact: true,
      },
    ],
  },

  /* ── About ────────────────────────────────────── */
  about: {
    intro:          WIP_EN,
    introJP:        WIP_JP,
    affiliation:    "Department of Computer Science, Graduate School of Information Science and Technology · The University of Tokyo",
    affiliationJP:  "東京大学 大学院 情報理工学系研究科 コンピュータ科学専攻 修士課程",
    profile: [
      {
        label: "Hobbies",
        labelJP: "趣味",
        values: [
          {
            title: "3D Modeling",
            titleJP: "3Dモデリング",
            desc: "I create anime-style humanoid models from scratch in Blender, and also develop add-ons.",
            descJP: "Blenderでの人型アニメ調モデルのフルスクラッチ制作やアドオン開発などを行っております。",
          },
          {
            title: "Competitive Programming",
            titleJP: "競技プログラミング",
            desc: "I have been actively participating in programming contests for several years and have achieved ranks such as AtCoder Yellow and Codeforces International Master.",
            descJP: "数年間にわたって継続的にコンテストへ参加しており、AtCoder黄色（初段）などを達成しています。",
          },
          {
            title: "Anime / Game / Vocaloid Culture",
            titleJP: "アニメ・ゲーム・ボカロ",
            desc: WIP_EN,
            descJP: WIP_JP,
          },
          {
            title: WIP_EN,
            titleJP: WIP_JP,
            desc: WIP_EN,
            descJP: WIP_JP,
          },
        ],
      },
      {
        label: "Favorite Phrase",
        labelJP: "好きな言葉",
        values: [
          {
            title: "Design Principle",
            titleJP: "設計思想",
          },
          {
            title: WIP_EN,
            titleJP: WIP_JP,
          },
        ],
      },
      {
        label: WIP_EN,
        labelJP: WIP_JP,
        values: [
          {
            title: "",
            titleJP: "",
          },
        ],
      },
    ],
  },

  /* ── Education & Experience ───────────────────── */
  timeline: [
    {
      period:   "2025 – Present",
      periodJP: "2025年 – 現在",
      title:    "Graduate School of Information Science and Technology, The University of Tokyo",
      titleJP:  "東京大学大学院 情報理工学系研究科 コンピュータ科学専攻",
      sub:      "M.S. Student in Computer Science",
      subJP:    "修士課程（情報理工学）",
      desc:     "Researching creativity support tools, optimization in CG, and NPR-related topics in the Igarashi Lab.",
      descJP:   "五十嵐研究室にて、クリエイター向け制作支援ツール、CG分野の最適化、NPR関連技術などを研究中。",
      link:     "https://www-ui.is.s.u-tokyo.ac.jp/",
      linkLabel:   "Igarashi Lab",
      linkLabelJP: "五十嵐研究室",
    },
    {
      period:   "2022 – 2025",
      periodJP: "2022年 – 2025年",
      title:    "Faculty of Science, The University of Tokyo",
      titleJP:  "東京大学 理学部 情報科学科",
      sub:      "B.S. in Information Science",
      subJP:    "学士（理学・情報科学）",
      desc:     "Alongside my studies, I enjoyed competitive programming and 3DCG creation with Blender. During my six-month undergraduate thesis, I worked on <a href=\"#research-scraprecover\">ScrapReCover</a> at the Igarashi Lab. (GPA: 3.43/4.30)",
      descJP:   "学業と並行して、競技プログラミング、Blenderによる3DCG制作などを楽しみました。半年間の卒業研究では、五十嵐研究室にて <a href=\"#research-scraprecover\">ScrapReCover</a> を実施しました。（GPA: 3.43/4.30）",
    },
    {
      period:   "2021 – 2022",
      periodJP: "2021年 – 2022年",
      title:    "Science I, The University of Tokyo",
      titleJP:  "東京大学 理科一類",
      sub:      "College of Arts and Sciences, The University of Tokyo",
      subJP:    "東京大学 教養学部 前期課程",
      desc:     "GPA: 3.84/4.30 (basic average score: 86.68/100; top 5%)",
      descJP:   "GPA: 3.84/4.30（基本平均点 86.68点）",
    },
    {
      period:   "",
      periodJP: "",
      title:    "Kaisei Junior and Senior High School",
      titleJP:  "開成中学校・高等学校",
      sub:      "Tokyo, Japan",
      subJP:    "",
      desc:     WIP_EMPTY,
      descJP:   WIP_EMPTY,
    },
  ],

  experience: [
    {
      period:   "2024.12-2026.2",
      periodJP: "2024.12-2026.2",
      title:    "Research Assistant, OLM Digital, Inc.",
      titleJP:  "RA（技術調査員）, 株式会社オー・エル・エム・デジタル",
      sub:      "R&D Division",
      subJP:    "R&D部門",
      desc:     "Proposed and implemented creator support tools for animation production in the ANIMINS project; collaborated with practitioners and conducted field studies and user testing.",
      descJP:   "「ANIMINSプロジェクト」の一環として、AIを活用したアニメ制作支援ツールに関する共同研究に従事し、現場調査や実制作データを通じて連携しました。成果物の一つが <a href=\"#research-gapfill\">GapFill</a> です。",
    },
    {
      period:   "2025, 2026",
      periodJP: "2025, 2026年",
      title:    "Teaching Assistant, 'CG Theory'",
      titleJP:  "TA（ティーチングアシスタント）, 「コンピュータグラフィクス論」",
      sub:      "Faculty of Science, The University of Tokyo",
      subJP:    "東京大学 理学部 情報科学科",
      desc:     "Supported coursework on computer graphics concepts and implementation.",
      descJP:   "",
    },
    {
      period:   "",
      periodJP: "",
      title:    WIP_EN,
      titleJP:  WIP_JP,
      sub:      "",
      subJP:    "",
      desc:     "",
      descJP:   "",
    },
  ],

  /* ── Skills ───────────────────────────────────── */
  skills: [
    {
      category:   "Programming Languages",
      categoryJP: "プログラミング言語",
      items: [
        {
          name: "C++",
          nameJP: "C++",
          detail: "Competitive programming, Siv3D、Qt など",
          detailJP: "競技プログラミング、Siv3D、Qt など",
          level: 91,
        },
        {
          name: "Python",
          nameJP: "Python",
          detail: "PyTorch, Blender add-ons",
          detailJP: "PyTorch、Blenderアドオン (bpy) など",
          level: 78,
        },
        {
          name: "TypeScript / JavaScript",
          nameJP: "TypeScript / JavaScript",
          detail: "React, Vite",
          detailJP: "React、Vite",
          level: 56,
        },
        {
          name: "HTML / CSS",
          nameJP: "HTML / CSS",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 51,
        },
        {
          name: "Verilog HDL",
          nameJP: "Verilog HDL",
          detail: "Five-stage pipelined CPU design",
          detailJP: "パイプラインCPUの設計・実装（CPU実験）",
          level: 27,
        },
      ],
    },
    {
      category:   "Competitive Programming / CTF",
      categoryJP: "競技プログラミング / CTF",
      items: [
        {
          name: "AtCoder Algorithm 2178",
          nameJP: "AtCoder（アルゴリズム）2178",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 91,
          href: "https://atcoder.jp/users/marc2825",
          dynamicKey: "atcoder_algorithm",
          tone: "yellow",
        },
        {
          name: "AtCoder Heuristic 1968",
          nameJP: "AtCoder（ヒューリスティック）1968",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 82,
          href: "https://atcoder.jp/users/marc2825?contestType=heuristic",
          dynamicKey: "atcoder_heuristic",
          tone: "blue",
        },
        {
          name: "Codeforces 2384",
          nameJP: "Codeforces 2384",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 92,
          href: "https://codeforces.com/profile/marc2825",
          dynamicKey: "codeforces",
          tone: "orange",
        },
        {
          name: "Onsite / Major Contest Results",
          nameJP: "オンサイト・大会実績",
          detail: "ACM-ICPC internal qualifier: 4th place (2024)<br>Student Top Programmer Championship finalist (2024)",
          detailJP: "ACM-ICPC 学内予選 4位（2024年）<br>最強プログラマー学生選手権 本戦出場（2024年）",
          level: 78,
        },
        {
          name: "CTF",
          nameJP: "CTF",
          detail: "Currently studying practical security through AlpacaHack and other past challenge sets.",
          detailJP: "AlpacaHack などの過去問を通じて、実践的なセキュリティを勉強中です。",
          level: 36,
        },
      ],
    },
    {
      category:   "CG & DCC Tools",
      categoryJP: "CG・DCCツール",
      items: [
        {
          name: "Blender",
          nameJP: "Blender",
          detail: "Full pipeline: modeling, UVs, texturing, rigging, shape keys etc.",
          detailJP: "モデリング、UV、テクスチャ、リギング、シェイプキー制作など含む",
          level: 93,
        },
        {
          name: "Unity",
          nameJP: "Unity",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 43,
        },
        {
          name: "Substance Painter",
          nameJP: "Substance Painter",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 32,
        },
        {
          name: "MikuMikuDance",
          nameJP: "MikuMikuDance",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY, /* Koikatsu, COM3D2*/
          level: 30,
        },
        {
          name: "OpenGL / GLSL",
          nameJP: "OpenGL / GLSL",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 31,
        },
        {
          name: "Unreal Engine 5",
          nameJP: "Unreal Engine 5",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 29,
        },
      ],
    },
    {
      category:   "Languages",
      categoryJP: "言語",
      items: [
        {
          name: "Japanese",
          nameJP: "日本語",
          detail: "Native in both conversation and writing.",
          detailJP: "母国語",
          level: 100,
        },
        {
          name: "English",
          nameJP: "英語",
          href: "#skills-certifications",
          detail: "Business level. <a href=\"#skill-cert-eiken1\">Eiken Grade 1</a>, <a href=\"#skill-cert-toefl\">TOEFL iBT 93</a>.",
          detailJP: "ビジネスレベル （<a href=\"#skill-cert-eiken1\">英検1級</a>、<a href=\"#skill-cert-toefl\">TOEFL iBT 93</a>）",
          level: 88,
        },
      ],
    },
    {
      category:   "Certifications",
      categoryJP: "資格",
      anchorId:   "skills-certifications",
      items: [
        {
          anchorId: "skill-cert-eiken1",
          name: "Eiken Grade 1",
          nameJP: "英検1級",
          detail: "Nov 2025",
          detailJP: "2025年11月 取得",
          level: 94,
        },
        {
          name: "Applied Information Technology Engineer",
          nameJP: "応用情報技術者",
          detail: WIP_EN,
          detailJP: "2023年6月 取得",
          level: 96,
        },
        {
          name: "Statistics Test Pre-1",
          nameJP: "統計検定 準1級",
          detail: WIP_EN,
          detailJP: "2025年4月 取得",
          level: 93,
        },
        {
          anchorId: "skill-cert-toefl",
          name: "TOEFL iBT 93点",
          nameJP: "TOEFL iBT 93点",
          detail: "May 2024",
          detailJP: "2024年5月 取得",
          level: 88,
        },
        {
          name: "Mathematics Proficiency Test Grade 1",
          nameJP: "数検1級",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 92,
        },
        {
          name: "CG Engineer Expert",
          nameJP: "CGエンジニア検定 エキスパート",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 90,
        },
        {
          name: "JDLA G Certification",
          nameJP: "G検定",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 82,
        },
      ],
    },
    {
      category:   "Other",
      categoryJP: "その他",
      items: [
        {
          name: WIP_EN,
          nameJP: WIP_JP,
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 84,
        },
      ],
    },
    {
      category:   WIP_EN,
      categoryJP: WIP_JP,
      items: [
        {
          name: WIP_EN,
          nameJP: WIP_JP,
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 84,
        },
      ],
    },
  ],

  /* ── Research interests ───────────────────────── */
  researchLead:   WIP_EMPTY,
  researchLeadJP: WIP_EMPTY,
  research: [
    {
      anchorId: "research-gapfill",
      period:   2025,
      periodJP: 2025,
      title:   "GapFill",
      titleJP: "GapFill",
      desc:    "Based on a formative study, designed and implemented a support tool for anime colorization that detects tiny unpainted regions, proposes fill colors, and reduces repetitive inspection and correction work; a user study demonstrated its usability and provided insights for the design of future support tools.",
      descJP:  "アニメ彩色における小さな塗り残しを対象とした制作支援ツールです。塗り残しの検出、拡大確認、色選択といった反復作業を減らすことを主目的として、現場調査に基づくUI設計と、アニメ塗りに特化した深層学習による色提案手法を組み合わせました。13名のプロ彩色者によるユーザスタディで有用性を検証し、社会実装へ向けた知見も提供しています。",
      image:   "assets/research/gapfill/GapFill_teaser.png",
      imageAlt: "GapFill teaser image",
      imageAltJP: "GapFill teaser画像",
      imageHref: "https://marc2825.github.io/GapFill/",
      tags:    ["Anime Production", "Creativity Support Tools", "HCI", "Deep Learning"],
      links: [
        { label: "Project Page", labelJP: "プロジェクトページ", href: "https://marc2825.github.io/GapFill/" },
      ],
    },
    {
      anchorId: "research-scraprecover",
      period:   2025,
      periodJP: 2025,
      title:   "ScrapReCover",
      titleJP: "ScrapReCover",
      desc:    "An interactive optimization system for designing freeform patchwork layouts from fabric scraps. It combines manual editing with simulated-annealing-based automatic suggestions, enabling iterative exploration of layouts that balance material reuse and visual intent. The system was evaluated through a fabrication workshop with 21 participants.",
      descJP:  "不要な布切れを用いた自由形パッチワークのレイアウト制作を支援するインタラクティブ最適化システムです。直感的なパラメータ操作を含む手動調整や、焼きなまし法に基づく自動提案を組み合わせることで、材料の有効活用と見た目の意図を両立する反復的な試行錯誤を可能にしました。ワークショップでの実制作を通じて実用性を評価済みです。",
      image:   "assets/research/scraprecover/ScrapReCover_teaser.png",
      imageAlt: "ScrapReCover teaser image",
      imageAltJP: "ScrapReCover teaser画像",
      imageHref: "https://marc2825.github.io/ScrapReCover/",
      tags:    ["Computational Fabrication", "Discrete Optimization", "Interaction", "Siv3D"],
      links: [
        { label: "Project Page", labelJP: "プロジェクトページ", href: "https://marc2825.github.io/ScrapReCover/" },
        { label: "Code",         labelJP: "コード",             href: "https://github.com/marc2825/ScrapReCover" },
      ],
    },
  ],

  /* ── Publications ─────────────────────────────── */
  papers: [
    {
      title:   "No Pixel Left Behind: Filling Gaps in Anime Colorization",
      titleJP: "No Pixel Left Behind: Filling Gaps in Anime Colorization",
      authors: "Masahiro Kono, Akinobu Maejima, Yuki Koyama, Yotam Sechayk, Takeo Igarashi",
      venue:   "CHI '26: ACM Conference on Human Factors in Computing Systems",
      venueJP: "CHI '26: ACM Conference on Human Factors in Computing Systems",
      venueHref: "https://chi2026.acm.org/",
      year:    2026,
      type:    "fullpaper",
      firstAuthor: true,
      links: [
        { label: "Project Page", labelJP: "プロジェクトページ", href: "https://marc2825.github.io/GapFill/" },
        { label: "PDF",          labelJP: "PDF",               href: "https://marc2825.github.io/GapFill/assets/GapFill_CHI.pdf" },
      ],
    },
    {
      title:   "GapFill: アニメ調彩色における塗り残しの解消を支援するツール",
      titleJP: "GapFill: アニメ調彩色における塗り残しの解消を支援するツール",
      authors: "Masahiro Kono, Akinobu Maejima, Yuki Koyama, Yotam Sechayk, Takeo Igarashi",
      venue:   "WISS 2025: The 33rd Workshop on Interactive Systems and Software",
      venueJP: "WISS 2025: 第33回インタラクティブシステムとソフトウェアに関するワークショップ",
      venueHref: "https://www.wiss.org/WISS2025/",
      year:    2025,
      type:    "demo",
      firstAuthor: true,
      links: [
        { label: "Project Page", labelJP: "プロジェクトページ", href: "https://marc2825.github.io/GapFill/" },
        { label: "PDF",          labelJP: "PDF",               href: "https://www.wiss.org/WISS2025Proceedings/data/demo/2-C15.pdf" },
      ],
    },
    {
      title:   "ScrapReCover：自由形パッチワーク制作のための配置最適化支援システム",
      titleJP: "ScrapReCover：自由形パッチワーク制作のための配置最適化支援システム",
      authors: "Masahiro Kono, Maria Larsson, I-Chao Shen, Takeo Igarashi",
      venue:   "WISS 2025: The 33rd Workshop on Interactive Systems and Software",
      venueJP: "WISS 2025: 第33回インタラクティブシステムとソフトウェアに関するワークショップ",
      venueHref: "https://www.wiss.org/WISS2025/",
      year:    2025,
      type:    "demo",
      firstAuthor: true,
      links: [
        { label: "Project Page", labelJP: "プロジェクトページ", href: "https://marc2825.github.io/ScrapReCover/" },
        { label: "PDF",          labelJP: "PDF",               href: "https://www.wiss.org/WISS2025Proceedings/data/demo/3-A01.pdf" },
      ],
    },
    {
      title:   "ScrapReCover: An Interactive Optimization System for Freeform Patchwork Layouts",
      titleJP: "ScrapReCover: An Interactive Optimization System for Freeform Patchwork Layouts",
      authors: "Masahiro Kono, Maria Larsson, I-Chao Shen, Takeo Igarashi",
      venue:   "SCF '25: ACM Symposium on Computational Fabrication",
      venueJP: "SCF '25: ACM Symposium on Computational Fabrication",
      venueHref: "https://scf.acm.org/2025/",
      year:    2025,
      type:    "fullpaper",
      firstAuthor: true,
      links: [
        { label: "Project Page", labelJP: "プロジェクトページ", href: "https://marc2825.github.io/ScrapReCover/" },
        { label: "PDF",          labelJP: "PDF",               href: "https://marc2825.github.io/ScrapReCover/assets/ScrapReCover_Paper_SCF25.pdf" },
        { label: "DOI",          labelJP: "DOI",               href: "https://dl.acm.org/doi/full/10.1145/3745778.3766653" },
        { label: "Code",         labelJP: "コード",            href: "https://github.com/marc2825/ScrapReCover" },
      ],
    },
    {
      title:   "Predicting Colors in Unpainted Gaps for Anime-Style Illustration",
      titleJP: "Predicting Colors in Unpainted Gaps for Anime-Style Illustration",
      authors: "Masahiro Kono, Akinobu Maejima, Yuki Koyama, Takeo Igarashi",
      venue:   "SIGGRAPH 2025 Posters",
      venueJP: "SIGGRAPH 2025 Posters",
      venueHref: "https://s2025.siggraph.org/",
      year:    2025,
      type:    "poster",
      firstAuthor: true,
      links: [
        { label: "Project Page", labelJP: "プロジェクトページ", href: "https://marc2825.github.io/GapFill/" },
        { label: "PDF",          labelJP: "PDF",               href: "https://marc2825.github.io/GapFill/assets/GapFill_Posters.pdf" },
        { label: "DOI",          labelJP: "DOI",               href: "https://dl.acm.org/doi/10.1145/3721250.3743027" },
      ],
    },
  ],

  talks: [],

  /* ── Projects ─────────────────────────────────── */
  projects: [
    {
      period:   2025,
      periodJP: 2025,
      title:   "Science Park Patchwork Workshop",
      titleJP: "サイエンスパークでのパッチワークワークショップ主催",
      desc:    "As part of the ScrapReCover project, I organized and conducted a public patchwork workshop / user study in cooperation with Science Park and Ochanomizu University. Participants brought their own fabric scraps, explored layouts with the system, and some fabricated tote bags based on the resulting designs.",
      descJP:  "ScrapReCoverプロジェクトの一環として、サイエンスパークおよびお茶の水女子大学と連携し、一般向け展示イベント内でパッチワーク制作ワークショップ兼ユーザスタディを企画・実施しました。参加者が持参した端切れを用いてレイアウト設計を行い、希望者にはその結果をもとにトートバッグの実制作まで体験してもらいました。",
      stack:   [],
      image:   "assets/projects/scraprecover-workshop/UserStudy.png",
      imageAlt: "Participants in the ScrapReCover workshop and user study",
      imageAltJP: "ScrapReCoverのワークショップ・ユーザスタディの様子",
      links:   [
        { label: "Project Page", labelJP: "プロジェクトページを見る", href: "https://marc2825.github.io/ScrapReCover/" },
        { label: "Science Park", labelJP: "サイエンスパーク", href: "https://www.sciencepark.jp/" },
      ],
    },
    {
      period:   2024,
      periodJP: 2024,
      title:   "Original VRChat Avatar Model",
      titleJP: "VRChat向けオリジナル3Dキャラクターモデル",
      desc:    "A full-scratch anime-style humanoid avatar created in Blender for VRChat and related real-time use. I handled the entire pipeline, including modeling, UV unwrapping, texturing, rigging, skinning, and shape keys. The project also became a personal testbed for NPR-style anime expression and small workflow improvements through Python add-ons.",
      descJP:  "VRChatなどでの利用を想定してBlenderでフルスクラッチ制作した人型アバターです。モデリング、UV展開、テクスチャ、リギング、スキニング、シェイプキー設定などの一連の工程を経験しました。加えて、2Dアニメ的な見え方を目指すNPR表現の試行錯誤も行っている段階です。",
      stack:   [],
      gallery: [
        {
          label: "Front View",
          labelJP: "正面",
          src: "assets/projects/vrchat-avatar/front_ori3d.png",
          alt: "Original VRChat avatar front view",
          altJP: "オリジナル3Dキャラクターモデル 正面",
        },
        {
          label: "Side View",
          labelJP: "側面",
          src: "assets/projects/vrchat-avatar/side_ori3d.png",
          alt: "Original VRChat avatar side view",
          altJP: "オリジナル3Dキャラクターモデル 側面",
        },
      ],
      links:   [
        { label: "Sketchfab", labelJP: "Sketchfabで見る", href: "https://skfb.ly/pHVBN" },
      ],
    },
    {
      period:   2022,
      periodJP: 2022,
      title:   "UT Anime Club Bulletin Revamp",
      titleJP: "東大アニメ研 会報企画・編集",
      desc:    "Revitalized a nearly dormant bulletin activity in the University of Tokyo Anime Club (SSA). I led editorial planning and overall layout design, coordinated article calls with other members, and helped turn the effort into a 100-page booklet. We distributed 200 copies at Comiket 101 (C101), establishing it as a sustainable club activity.",
      descJP:  "前年度まで形骸化していた東大アニメ研の会報活動を刷新しました。全体の編集やデザインの主導、記事募集・一部記事の執筆を担当し、表紙イラスト制作や当日の頒布は他の部員と役割分担しながら、100ページ程度の冊子として完成させました。コミックマーケット101で約150部を頒布（完売）し、サークルの新たな活動基盤として根付きました。協力してくださった皆さん、ありがとうございました。",
      stack:   [],
      href:    "assets/projects/ut-anime-club-bulletin/ssa_c101_abst.pdf",
      gallery: [
        {
          label: "Cover",
          labelJP: "表紙",
          src: "assets/projects/ut-anime-club-bulletin/ssa_c101_cover.png",
          alt: "Cover of the UT Anime Club bulletin",
          altJP: "東大アニメ研会報の表紙",
        },
        {
          label: "Sample",
          labelJP: "誌面サンプル",
          src: "assets/projects/ut-anime-club-bulletin/ssa_c101_sample.png",
          alt: "Sample spread from the UT Anime Club bulletin",
          altJP: "東大アニメ研会報の誌面サンプル",
        },
      ],
      links:   [
        { label: "Open Abstract PDF", labelJP: "会報（抜粋）を見る", href: "assets/projects/ut-anime-club-bulletin/ssa_c101_abst.pdf" },
      ],
    },
    { /* CPU実験　などなど 時間あるときに*/
      period:   WIP_EMPTY,
      periodJP: WIP_EMPTY,
      title:   WIP_EN,
      titleJP: WIP_JP,
      desc:    WIP_EN,
      descJP:  WIP_JP,
      stack:   [],
      image:   WIP_EMPTY,
      links:   [],
    },
  ],

  /* ── Articles ─────────────────────────────────── */
  articles: [],

  /* ── News ───────────────────────────────────────
     Add one entry per item in the following format:
     { date: "2026.03", dateJP: "2026.03", text: "Short news text", textJP: "お知らせ本文" },
     `dateJP` can be omitted when the same date is used in both languages.

     Ordering rule for news as well:
     top = newest / bottom = oldest
  ───────────────────────────────────────────────── */
  news: [
    { date: "2026.04", text: "One <a href='https://marc2825.github.io/GapFill/'>first-author full paper</a> was accepted to <a href='https://chi2026.acm.org/'>CHI 2026</a>. I will present it in person in Barcelona, Spain.", textJP: "<a href='https://chi2026.acm.org/'>CHI 2026</a>に、<a href='https://marc2825.github.io/GapFill/'>筆頭著者のフルペーパー1件</a>が採択されました。スペイン・バルセロナにて現地発表を行います。" },
    { date: "2025.12", text: "Two demo presentations were accepted to <a href='https://www.wiss.org/WISS2025/'>WISS 2025</a>. I will present them in person in Hokkaido, Japan.", textJP: "<a href='https://www.wiss.org/WISS2025/'>WISS 2025</a>に、デモ発表2件が採択されました。日本・北海道にて現地発表を行います。" },
    { date: "2025.11", text: "One <a href='https://marc2825.github.io/ScrapReCover/'>first-author full paper</a> was accepted to <a href='https://scf.acm.org/2025/'>SCF 2025</a>. I will present it in person in Cambridge, MA, USA.", textJP: "<a href='https://scf.acm.org/2025/'>SCF 2025</a>に、<a href='https://marc2825.github.io/ScrapReCover/'>筆頭著者のフルペーパー1件</a>が採択されました。アメリカ・ボストンにて現地発表を行います。" },
    { date: "2025.08", text: "One first-author poster was accepted to <a href='https://s2025.siggraph.org/'>SIGGRAPH 2025</a>. I will present it in person in Vancouver, Canada.", textJP: "<a href='https://s2025.siggraph.org/'>SIGGRAPH 2025</a>に、筆頭著者のポスター1件が採択されました。カナダ・バンクーバーにて現地発表を行います。" },
    { date: "2025.04", text: "I graduated from the Department of Information Science, Faculty of Science, The University of Tokyo, and advanced to the Department of Computer Science, Graduate School of Information Science and Technology, The University of Tokyo.", textJP: "東京大学理学部情報科学科を卒業し、同大学の大学院情報理工学系研究科コンピュータ科学専攻に進学しました。" },
  ],

  /* ── Contact ──────────────────────────────────── */
  contactText:   "I am open to research collaborations, internships, and conversations.",
  contactTextJP: "共同研究・インターン・ご連絡等を歓迎しております。",
};

/* ── UI translations ──────────────────────────────────────── */
const I18N = {
  en: {
    "meta.title":              "Masahiro Kono | Portfolio",
    "meta.description":        "Portfolio of Masahiro Kono: creator-centered CG, HCI, and NPR research",
    "nav.about":               "About",
    "nav.research":            "Research",
    "nav.publications":        "Publications",
    "nav.projects":            "Projects",
    "nav.articles":            "Articles",
    "nav.skills":              "Skills",
    "nav.education":           "Education",
    "nav.news":                "News",
    "nav.contact":             "Contact",
    "hero.label":              "Graduate Researcher",
    "hero.cta1":               "View Research Projects",
    "hero.cta2":               "Get in Touch",
    "hero.scroll":             "Scroll",
    "about.title":             "About",
    "about.intro.title":       "Introduction",
    "about.history.title":     "Career",
    "about.affiliation.title": "Affiliation",
    "research.title":          "Research Projects",
    "pub.title":               "Papers, Publications & Presentations",
    "pub.tab.papers":          "Papers",
    "pub.tab.talks":           "Talks",
    "pub.filter.all":          "All",
    "pub.filter.fullpaper":    "Full Paper",
    "pub.filter.poster":       "Poster",
    "pub.filter.demo":         "Demo",
    "pub.filter.firstAuthor":  "First Author Only",
    "projects.title":          "Projects (Other)",
    "articles.title":          "Articles",
    "skills.title":            "Skills",
    "edu.title":               "Education & Experience",
    "edu.section.education":   "Education",
    "edu.section.experience":  "Experience",
    "news.title":              "News",
    "news.fab":                "News",
    "contact.title":           "Contact",
    "section.more":            "View All →",
    "subpage.back":            "← Back to Portfolio",
    "wip.text":                "🚧 This site is currently under construction",
  },
  ja: {
    "meta.title":              "河野将大 | ポートフォリオ",
    "meta.description":        "河野将大のポートフォリオ。CG・HCI・NPRの制作支援研究と個人制作",
    "nav.about":               "自己紹介",
    "nav.research":            "研究",
    "nav.publications":        "出版・発表",
    "nav.projects":            "プロジェクト",
    "nav.articles":            "記事",
    "nav.skills":              "スキル",
    "nav.education":           "経歴",
    "nav.news":                "お知らせ",
    "nav.contact":             "連絡先",
    "hero.label":              "大学院研究者",
    "hero.cta1":               "研究プロジェクトを見る",
    "hero.cta2":               "連絡する",
    "hero.scroll":             "スクロール",
    "about.title":             "自己紹介",
    "about.intro.title":       "自己紹介",
    "about.history.title":     "経歴",
    "about.affiliation.title": "所属",
    "research.title":          "研究プロジェクト",
    "pub.title":               "論文・出版・発表",
    "pub.tab.papers":          "論文",
    "pub.tab.talks":           "登壇",
    "pub.filter.all":          "すべて",
    "pub.filter.fullpaper":    "フルペーパー",
    "pub.filter.poster":       "ポスター",
    "pub.filter.demo":         "デモ発表",
    "pub.filter.firstAuthor":  "筆頭著者のみ",
    "projects.title":          "プロジェクト（その他）",
    "articles.title":          "記事",
    "skills.title":            "スキル",
    "edu.title":               "学歴・職歴",
    "edu.section.education":   "学歴",
    "edu.section.experience":  "職歴（インターン等含む）",
    "news.title":              "お知らせ",
    "news.fab":                "お知らせ",
    "contact.title":           "連絡先",
    "section.more":            "すべて見る →",
    "subpage.back":            "← ポートフォリオに戻る",
    "wip.text":                "🚧 このサイトは現在制作中です",
  },
};

/* =========================================================
   data.js — All portfolio content & configuration
   Shared content lives here. See simplified.js for the simplified view.
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

  /* ── Analytics ──────────────────────────────────
     GoatCounter setup:
     1. Create a GoatCounter site.
     2. Paste your endpoint below, for example:
        https://YOURCODE.goatcounter.com/count
     3. Deploy the site.

     Once configured, GoatCounter will count pageviews and show referrers
     when the browser sends them.
  ───────────────────────────────────────────────── */
  analytics: {
    goatcounter: {
      endpoint: "",
      allowLocal: false,
    },
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
    emails:   [
      "marckono2825@gmail.com",
      "marckono2825@g.ecc.u-tokyo.ac.jp",
    ],
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
        showInContact: false,
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
    affiliation:    "Department of Computer Science, Graduate School of Information Science and Technology · The University of Tokyo",
    affiliationJP:  "東京大学 大学院 情報理工学系研究科 コンピュータ科学専攻 修士課程",
    profile: [
      {
        id: "hobbies",
        label: "Hobbies",
        labelJP: "趣味",
        wide: true,
        values: [
          {
            title: "Competitive Programming",
            titleJP: "競技プログラミング",
            desc: "I have been actively participating in programming contests for several years and have achieved AtCoder Yellow (2 Dan) and Codeforces Grandmaster.",
            descJP: "数年間にわたって継続的にコンテストへ参加・作問しており、AtCoder黄色（二段）やCodeforces Grandmasterを達成しております💪",
          },
          {
            title: "3D Modeling",
            titleJP: "3Dモデリング",
            desc: "I create anime-style humanoid models from scratch in Blender, and also develop add-ons.",
            descJP: "Blenderでの人型アニメ調モデルのフルスクラッチ制作やアドオン開発などを行っております💻️ ",
          },
          {
            title: "Traveling・Walking around",
            titleJP: "旅行・散歩",
            desc: "I especially love traveling to places rich in nature and off the beaten path. Lately, I've been really into exploring remote islands!",
            descJP: "自然豊かな場所や、人里離れた場所に行くのが特に好きです✈️ 最近は離島巡りにハマってます🏝️",
          },
          {
            title: "Video Game",
            titleJP: "ゲーム",
            desc: "I've loved gaming since my school days! These days, I mainly play FPS games (especially Apex), competitive Pokémon, and VRChat. 🎮",
            descJP: "中高時代からゲーム（特に対戦型・戦略ゲーム）が大好きです👾 最近はFPS（主にApex）、ポケモン対戦などで遊ぶことが多いです🎮️",
          },
          {
            title: "Anime / Streams",
            titleJP: "アニメ・配信視聴",
            desc: "I was especially into anime during my junior high and high school years! These days, I also enjoy watching livestreams, esports, and 3D live concerts. 📺",
            descJP: "特に中高時代は、毎クール放送される数多くの深夜アニメを楽しんでました。特定の作品に限らず、総体としてのアニメが好きです！ 最近は配信や競技シーン、3Dライブなどを比較的よく観ています📺️",
          },
          {
            title: "Japanese Internet Music",
            titleJP: "ネットカルチャー系音楽",
            desc: "I'm a big fan of Vocaloid, Project SEKAI, Gakumas, and VTuber music. I especially LOVE Project SEKAI! 🎶",
            descJP: "ボカロ・プロセカ・学マス・VTuberなどの楽曲が好みで、特にプロセカは大好きです🎶",
          },
        ],
      },
      {
        label: "Favorite Phrase",
        labelJP: "好きな言葉",
        value: "Design Principle",
        valueJP: "設計思想",
      },
      {
        label: "Recent Thoughts",
        labelJP: "最近のひとこと",
        value: "With all the recent advances in AI, I've been having fun trying out things I've always wanted to do and finding ways to make my existing workflows more efficient! 💪",
        valueJP: "AIの進化でできることが増えたので、以前からやってみたかったことに挑戦したり、これまでやってきたことを効率化したりして楽しんでます💪",
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
      desc:     "Researching creativity support tools, optimization in CG, and NPR-related topics in the Igarashi Lab (e.g., <a href=\"#research-gapfill\">GapFill</a>).",
      descJP:   "五十嵐研究室にて、クリエイター向け制作支援ツール、CG分野の最適化、NPR関連技術などを研究中です。M1 の一年間で、二本のフル論文が国際会議に採択されました。（研究例：<a href=\"#research-gapfill\">GapFill</a>）",
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
      desc:     "Alongside my studies, I enjoyed competitive programming and 3DCG creation with Blender. During my six-month undergraduate thesis, I worked on <a href=\"#research-scraprecover\">ScrapReCover</a> at the Igarashi Lab.",
      descJP:   "学業と並行して、競技プログラミング、Blenderによる3DCG制作などを楽しみました。半年間の卒業研究では、五十嵐研究室にて <a href=\"#research-scraprecover\">ScrapReCover</a> を実施しました。",
    },
    {
      id:       "utokyo-science-i",
      period:   "2021 – 2022",
      periodJP: "2021年 – 2022年",
      title:    "Science I, The University of Tokyo",
      titleJP:  "東京大学 理科一類",
      sub:      "College of Arts and Sciences, The University of Tokyo",
      subJP:    "東京大学 教養学部 前期課程",
      desc:     "GPA: 3.84/4.30 (basic average score: 86.68/100; top 5%) / Entrance Exam: 391.6/550",
      descJP:   "GPA: 3.84/4.30（基本平均点 86.68点） / Entrance Exam: 391.6/550",
    },
    {
      id:       "kaisei",
      period:   "2014 – 2020",
      periodJP: "2014年 – 2020年",
      title:    "Kaisei Junior and Senior High School",
      titleJP:  "開成中学校・高等学校",
      sub:      "Tokyo, Japan",
      subJP:    "",
      desc:     "I spent much of my time enjoying games and other hobbies, especially in junior high school. Those experiences helped inspire my interest in working in the entertainment industry.",
      descJP:   "（特に中学の頃は）遊んでばかりでしたが、当時の生活が現在エンタメ業界を志すきっかけにもなっています！",
    },
  ],

  experience: [
    {
      period:   "2024.12-2026.9",
      periodJP: "2024.12-2026.9",
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
      title:    "Teaching Assistant, 'CG Theory' 'Fundamental Experiments in Computer Science' ",
      titleJP:  "TA（ティーチングアシスタント）, 「コンピュータグラフィクス論」・「情報科学基礎実験」",
      sub:      "Faculty of Science, The University of Tokyo",
      subJP:    "東京大学 理学部 情報科学科",
      desc:     "Supported coursework on computer graphics concepts and implementation.",
      descJP:   "",
    },
  ],

  /* ── Skills ───────────────────────────────────── */
  skills: [
    {
      category:   "Programming",
      categoryJP: "プログラミング",
      items: [
        {
          name: "C++",
          nameJP: "C++",
          detail: "Competitive programming, Siv3D, Qt, and more",
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
        /*
        {
          name: "TypeScript / JavaScript",
          nameJP: "TypeScript / JavaScript",
          detail: "React, Vite",
          detailJP: "React、Vite",
          level: 56,
        },
        */
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
        {
          name: "AI-Assisted Coding",
          nameJP: "コーディングエージェント",
          detail: "I have primarily developed with Codex and Claude Code since summer 2025.",
          detailJP: "25年夏頃から、専ら codex や claude code を用いて開発しております。",
          level: 79,
        },
      ],
    },
    {
      category:   "Competitive Programming",
      categoryJP: "競技プログラミング",
      items: [
        {
          name: "AtCoder Algorithm Peak Rating 2215",
          nameJP: "AtCoder（アルゴ） 最高レート 2215",
          detail: "",
          detailJP: "",
          level: 92,
          href: "https://atcoder.jp/users/marc2825",
          dynamicKey: "atcoder_algorithm",
          tone: "yellow",
        },
        {
          name: "AtCoder Heuristic Peak Rating 2121",
          nameJP: "AtCoder（ヒューリスティック） 最高レート 2121",
          detail: "",
          detailJP: "",
          level: 88,
          href: "https://atcoder.jp/users/marc2825?contestType=heuristic",
          dynamicKey: "atcoder_heuristic",
          tone: "yellow",
        },
        {
          name: "Codeforces Peak Rating 2415",
          nameJP: "Codeforces 最高レート 2415",
          detail: "",
          detailJP: "",
          level: 93,
          href: "https://codeforces.com/profile/marc2825",
          dynamicKey: "codeforces",
          tone: "red",
        },
        {
          name: "Problem Setting",
          nameJP: "作問",
          detail: "I create original competitive programming problems and publish them mainly on yukicoder, including <a href='https://yukicoder.me/contests/600'>Contest 504</a> and <a href='https://yukicoder.me/contests/610'>Contest 516</a>.",
          detailJP: "オリジナル問題を作成し、yukicoderなどで公開しています。例： <a href='https://yukicoder.me/contests/600'>Yukicoder Contest 504</a>・<a href='https://yukicoder.me/contests/610'>Yukicoder Contest 516</a> ",
          level: 78,
        },
        {
          name: "Onsite / Major Contest Results",
          nameJP: "オンサイト・大会実績",
          detail: "ACM-ICPC internal qualifier: 4th place (2024)<br>Student Top Programmer Championship finalist (2024)",
          detailJP: "ACM-ICPC 学内予選 4位（2024年）<br>最強プログラマー学生選手権 本戦出場（2024年）",
          level: 58,
        },

      ],
    },
    {
      category:   "CG & DCC Tools",
      categoryJP: "CG・DCCツール",
      note:       "Lately, I've also been exploring ways to make use of AI 🔎",
      noteJP:     "最近はAIの活用法も模索中です🔎",
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
        /*
        {
          name: "Substance Painter",
          nameJP: "Substance Painter",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 32,
        },
        */
        {
          name: "MikuMikuDance",
          nameJP: "MikuMikuDance",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY, /* Koikatsu, COM3D2*/
          level: 30,
        },
        /*
        {
          name: "OpenGL / GLSL",
          nameJP: "OpenGL / GLSL",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 31,
        },
        */
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
          detail: "June 2023",
          detailJP: "2023年6月 取得",
          level: 96,
        },
        {
          name: "Mathematics Proficiency Test Grade 1",
          nameJP: "数検1級",
          detail: "July 2026",
          detailJP: "2026年7月 取得",
          level: 92,
        },
        {
          name: "Statistics Test Pre-1",
          nameJP: "統計検定 準1級",
          detail: "April 2025",
          detailJP: "2025年4月 取得",
          level: 83,
        },
        {
          anchorId: "skill-cert-toefl",
          name: "TOEFL iBT 93",
          nameJP: "TOEFL iBT 93点",
          detail: "May 2024",
          detailJP: "2024年5月 取得",
          level: 88,
        },
        {
          anchorId: "skill-cert-other",
          name: "Other",
          nameJP: "その他",
          detail: "CG Engineer Expert / JDLA G Certification",
          detailJP: "CGエンジニア検定 エキスパート / G検定 など",
          level: 60,
        },
      ],
    },
    {
      category:   "Other",
      categoryJP: "その他の活動",
      items: [
        {
          name: "Novel Writing",
          nameJP: "小説執筆",
          detail: "I regularly publish short stories on pixiv, consistently receiving over 100 likes.",
          detailJP: "pixivで短編小説を定期的に公開しており、安定して3桁のいいねを獲得しております！",
          level: 84,
        },
        {
          name: "AI Image Generation",
          nameJP: "画像生成AI",
          detail: "I experiment with NovelAI and ComfyUI to improve control over image generation.",
          detailJP: "NovelAI や ComfyUI で絵柄や構図の制御性を高めるために試行錯誤中です。",
          level: 74,
        },
        {
          name: "AI Agent Operations",
          nameJP: "AIエージェント運用",
          detail: "I have used muse and Grok bot to automate various tasks since around fall 2026.",
          detailJP: "2026年秋頃から、muse や Grok bot を使ってさまざまな作業を自動化しています。（副業含む）",
          level: 70,
        },
        /*
        {
          name: "Investing",
          nameJP: "投資",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 54,
        },
        {
          name: "AI Utilization",
          nameJP: "AI運用",
          detail: WIP_EMPTY,
          detailJP: WIP_EMPTY,
          level: 44,
        }, 
        {
          name: "CTF (security)",
          nameJP: "CTF （セキュリティの勉強）",
          detail: "I study practical security through past AlpacaHack challenges and experimental personal projects.",
          detailJP: "AlpacaHack の過去問や実験的な個人開発を通じて、実践的なセキュリティを勉強中です。",
          level: 36,
        },
        */
        {
          anchorId: "skill-activities-other",
          name: "Other",
          nameJP: "その他",
          detail: "Investing / CTF (security)",
          detailJP: "投資 / CTF（セキュリティの勉強） など",
          level: 45,
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
      descJP:  "アニメ彩色における小さな塗り残しを対象とした制作支援ツールです。塗り残しの検出、拡大確認、色選択といった反復作業を減らすことを主目的として、現場調査に基づくUI設計と、アニメ塗りに特化した深層学習による色提案手法を組み合わせました。13名のプロ彩色者によるユーザスタディで有用性を検証し、社会実装へ向けた知見も提供しています。（HCI 分野の国際トップカンファレンスにも採択されました）",
      image:   "assets/research/gapfill/GapFill_teaser.webp",
      imageAlt: "GapFill teaser image",
      imageAltJP: "GapFill teaser画像",
      imageHref: "https://marc2825.github.io/GapFill/",
      tags:    ["Anime Production", "Creativity Support Tools", "HCI", "Deep Learning"],
      links: [
        { label: "Project Page", labelJP: "プロジェクトページ", href: "https://marc2825.github.io/GapFill/" },
        { label: "Code",         labelJP: "コード",             href: "https://github.com/marc2825/GapFill" },
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
      image:   "assets/research/scraprecover/ScrapReCover_teaser.webp",
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
  /* 著者一覧で下線を引く自分の名前（表記ゆれがあれば追加） */
  selfAuthorNames: ["Masahiro Kono"],

  papers: [
    {
      title:   "ScrapCuts: Fabric Scrap Recomposition with Differentiable Cutline Optimization",
      titleJP: "ScrapCuts: Fabric Scrap Recomposition with Differentiable Cutline Optimization",
      authors: "Yinfei Qian, Quentin Becker, I-Chao Shen, Masahiro Kono, Hennes Rave, Maria Larsson, Takeo Igarashi",
      venue:   "SCF '26: ACM Symposium on Computational Fabrication",
      venueJP: "SCF '26: ACM Symposium on Computational Fabrication",
      venueHref: "https://scf.acm.org/2026/papers.html",   /* 論文リンク未公開のため採択論文一覧へ */
      year:    2026,
      type:    "fullpaper",
      firstAuthor: false,
      links: [],
    },
    {
      title:   "No Pixel Left Behind: Filling Gaps in Anime Colorization",
      titleJP: "No Pixel Left Behind: Filling Gaps in Anime Colorization",
      authors: "Masahiro Kono, Akinobu Maejima, Yuki Koyama, Yotam Sechayk, Takeo Igarashi",
      venue:   "CHI '26: ACM Conference on Human Factors in Computing Systems",
      venueJP: "CHI '26: ACM Conference on Human Factors in Computing Systems",
      venueHref: "https://chi2026.acm.org/",
      year:    2026,
      type:    "fullpaper",
      topConference: true,
      firstAuthor: true,
      links: [
        { label: "Project Page", labelJP: "プロジェクトページ", href: "https://marc2825.github.io/GapFill/" },
        { label: "PDF",          labelJP: "PDF",               href: "https://marc2825.github.io/GapFill/assets/GapFill_CHI.pdf" },
        { label: "DOI",          labelJP: "DOI",               href: "https://doi.org/10.1145/3772318.3790968" },
        { label: "Code",         labelJP: "コード",             href: "https://github.com/marc2825/GapFill" },
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
      authors: "Masahiro Kono, Maria Larsson, Takeo Igarashi",
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
      authors: "Masahiro Kono, Maria Larsson, Takeo Igarashi",
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

  /* 査読経験: 会議・論文誌ごとに追加（新しい年度を上に）。空配列なら非表示。 */
  reviewing: [
    {
      venue:   "Eurographics",
      venueJP: "Eurographics",
      year:    2027,
    },
  ],

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
      image:   "assets/projects/scraprecover-workshop/UserStudy.webp",
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
          src: "assets/projects/vrchat-avatar/front_ori3d.webp",
          alt: "Original VRChat avatar front view",
          altJP: "オリジナル3Dキャラクターモデル 正面",
        },
        {
          label: "Side View",
          labelJP: "側面",
          src: "assets/projects/vrchat-avatar/side_ori3d.webp",
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
      descJP:  "前年度まで形骸化していた東大アニメ研の会報活動を刷新しました。全体の編集やデザインの主導、記事募集・一部記事の執筆を担当し、表紙イラスト制作や当日の頒布は他の部員と役割分担しながら、100ページ程度の冊子として完成させました。コミックマーケット101で200部を頒布（完売）し、サークルの新たな活動基盤として根付きました。協力してくださった皆さん、ありがとうございました。",
      stack:   [],
      href:    "assets/projects/ut-anime-club-bulletin/ssa_c101_abst.pdf",
      gallery: [
        {
          label: "Cover",
          labelJP: "表紙",
          src: "assets/projects/ut-anime-club-bulletin/ssa_c101_cover.webp",
          alt: "Cover of the UT Anime Club bulletin",
          altJP: "東大アニメ研会報の表紙",
        },
        {
          label: "Sample",
          labelJP: "誌面サンプル",
          src: "assets/projects/ut-anime-club-bulletin/ssa_c101_sample.webp",
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
    {
      date: "2027.04 (Incoming)",
      dateJP: "2027.04（入社予定）",
      text: "I will join the R&D division of Sony Group in April 2027! Excited to start a new chapter in the entertainment industry!  (Please note that I cannot discuss company-related matters🙏.)",
      textJP: "2027年4月にSony Group 株式会社 (SGC) の R&D部門に入社予定です。エンタメ業界で心機一転、頑張ります！（なお、会社に関するお問い合わせにはお答えできません🙏）"
    },
    { date: "2026.09", text: "I gave an <a href='https://visualcomputing.jp/vc2026/program/oral/'>invited talk at Visual Computing 2026 (VC2026)</a> on our <a href='https://marc2825.github.io/GapFill/'>GapFill</a> research.", textJP: "<a href='https://visualcomputing.jp/vc2026/program/oral/'>Visual Computing 2026 (VC2026)</a>にて、<a href='https://marc2825.github.io/GapFill/'>GapFill</a>の招待講演を行いました。" },
    { date: "2026.04", text: "One <a href='https://marc2825.github.io/GapFill/'>first-author full paper</a> was accepted to <a href='https://chi2026.acm.org/'>CHI 2026</a>. I will present it in person in Barcelona, Spain.", textJP: "<a href='https://chi2026.acm.org/'>CHI 2026</a>に、<a href='https://marc2825.github.io/GapFill/'>筆頭著者のフルペーパー1件</a>が採択されました。スペイン・バルセロナにて現地発表を行います。" },
    { date: "2025.12", text: "Two demo presentations were accepted to <a href='https://www.wiss.org/WISS2025/'>WISS 2025</a>. I will present them in person in Hokkaido, Japan.", textJP: "<a href='https://www.wiss.org/WISS2025/'>WISS 2025</a>に、デモ発表2件が採択されました。日本・北海道にて現地発表を行います。" },
    { date: "2025.11", text: "One <a href='https://marc2825.github.io/ScrapReCover/'>first-author full paper</a> was accepted to <a href='https://scf.acm.org/2025/'>SCF 2025</a>. I will present it in person in Cambridge, MA, USA.", textJP: "<a href='https://scf.acm.org/2025/'>SCF 2025</a>に、<a href='https://marc2825.github.io/ScrapReCover/'>筆頭著者のフルペーパー1件</a>が採択されました。アメリカ・ボストンにて現地発表を行います。" },
    { date: "2025.08", text: "One first-author poster was accepted to <a href='https://s2025.siggraph.org/'>SIGGRAPH 2025</a>. I will present it in person in Vancouver, Canada.", textJP: "<a href='https://s2025.siggraph.org/'>SIGGRAPH 2025</a>に、筆頭著者のポスター1件が採択されました。カナダ・バンクーバーにて現地発表を行います。" },
    { date: "2025.04", text: "I graduated from the Department of Information Science, Faculty of Science, The University of Tokyo, and advanced to the Department of Computer Science, Graduate School of Information Science and Technology, The University of Tokyo.", textJP: "東京大学理学部情報科学科を卒業し、同大学の大学院情報理工学系研究科コンピュータ科学専攻に進学しました。" },
  ],

  /* ── Contact ──────────────────────────────────── */
  contactText:   "Collaborations and inquiries are welcome. This is a personal website, independent of my affiliated organizations and their intellectual property.",
  contactTextJP: "共同研究・ご連絡等を歓迎しております。（本サイトの活動は個人のものであり、所属組織およびその知的財産とは独立しています。）",
};

/* ── UI translations ──────────────────────────────────────── */
const I18N = {
  en: {
    "meta.title":              "Masahiro Kono | Portfolio",
    "meta.description":        "Portfolio of Masahiro Kono: creator-centered CG, HCI, and NPR research",
    "meta.research.title":     "Research — Masahiro Kono | Portfolio",
    "meta.research.description": "Research projects by Masahiro Kono in CG, HCI, NPR, and creativity support tools.",
    "meta.publications.title": "Publications — Masahiro Kono | Portfolio",
    "meta.publications.description": "Papers, publications, presentations, and peer review service by Masahiro Kono.",
    "meta.projects.title":     "Projects — Masahiro Kono | Portfolio",
    "meta.projects.description": "Personal projects by Masahiro Kono, including 3D modeling, workshops, and editorial design.",
    "meta.articles.title":     "Articles — Masahiro Kono | Portfolio",
    "meta.articles.description": "Articles and writing by Masahiro Kono.",
    "meta.news.title":         "News — Masahiro Kono | Portfolio",
    "meta.news.description":   "News about Masahiro Kono's research, presentations, and activities.",
    "nav.about":               "About",
    "nav.research":            "Research",
    "nav.publications":        "Publications",
    "nav.projects":            "Projects",
    "nav.articles":            "Articles",
    "nav.skills":              "Skills",
    "nav.education":           "Education",
    "nav.news":                "News",
    "nav.contact":             "Contact",
    "nav.menu.open":           "Open menu",
    "nav.menu.close":          "Close menu",
    "theme.light":             "Switch to light mode",
    "theme.dark":              "Switch to dark mode",
    "dialog.close":            "Close",
    "language.label":          "Language",
    "hero.cta1":               "View Research Projects",
    "hero.cta2":               "Get in Touch",
    "hero.scroll":             "Scroll",
    "hero.detailsHint":        "Hover or press to see details.",
    "hero.detailsDemo":        "Try a detail pop-up",
    "hero.detailsExample":     "This is how item details appear.",
    "about.title":             "About",
    "about.affiliation.title": "Affiliation",
    "research.title":          "Research Projects",
    "pub.title":               "Papers, Publications & Presentations",
    "pub.filter.typeGroup":    "Publication type",
    "pub.filter.authorGroup":  "Authorship",
    "pub.filter.all":          "All",
    "pub.filter.fullpaper":    "Full Paper",
    "pub.filter.poster":       "Poster",
    "pub.filter.demo":         "Demo",
    "pub.filter.firstAuthor":  "First Author Only",
    "pub.reviewing":           "Peer Review Service",
    "projects.title":          "Projects (Other, Selected)",
    "articles.title":          "Articles",
    "skills.title":            "Skills",
    "edu.title":               "Education & Experience",
    "edu.section.education":   "Education",
    "edu.section.experience":  "Experience (Selected)",
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
    "meta.research.title":     "研究 — 河野将大 | ポートフォリオ",
    "meta.research.description": "河野将大によるCG・HCI・NPR分野の研究とクリエイター向け制作支援ツールを紹介します。",
    "meta.publications.title": "論文・出版・発表 — 河野将大 | ポートフォリオ",
    "meta.publications.description": "河野将大の論文・出版・発表および査読経験を紹介します。",
    "meta.projects.title":     "プロジェクト — 河野将大 | ポートフォリオ",
    "meta.projects.description": "河野将大による3Dモデル制作、ワークショップ、会報編集などの個人プロジェクトを紹介します。",
    "meta.articles.title":     "記事 — 河野将大 | ポートフォリオ",
    "meta.articles.description": "河野将大による記事・執筆活動を紹介します。",
    "meta.news.title":         "お知らせ — 河野将大 | ポートフォリオ",
    "meta.news.description":   "河野将大の研究・発表・活動に関するお知らせです。",
    "nav.about":               "自己紹介",
    "nav.research":            "研究",
    "nav.publications":        "出版・発表",
    "nav.projects":            "プロジェクト",
    "nav.articles":            "記事",
    "nav.skills":              "スキル",
    "nav.education":           "経歴",
    "nav.news":                "お知らせ",
    "nav.contact":             "連絡先",
    "nav.menu.open":           "メニューを開く",
    "nav.menu.close":          "メニューを閉じる",
    "theme.light":             "ライトモードに切り替え",
    "theme.dark":              "ダークモードに切り替え",
    "dialog.close":            "閉じる",
    "language.label":          "言語",
    "hero.cta1":               "研究プロジェクトを見る",
    "hero.cta2":               "連絡する",
    "hero.scroll":             "スクロール",
    "hero.detailsHint":        "カーソルを合わせると、詳細が読めます！",
    "hero.detailsDemo":        "詳細ポップアップを試す",
    "hero.detailsExample":     "このように、項目ごとの詳細が表示されます。",
    "about.title":             "自己紹介",
    "about.affiliation.title": "所属",
    "research.title":          "研究プロジェクト",
    "pub.title":               "論文・出版・発表",
    "pub.filter.typeGroup":    "発表種別",
    "pub.filter.authorGroup":  "著者",
    "pub.filter.all":          "すべて",
    "pub.filter.fullpaper":    "フルペーパー",
    "pub.filter.poster":       "ポスター",
    "pub.filter.demo":         "デモ発表",
    "pub.filter.firstAuthor":  "筆頭著者のみ",
    "pub.reviewing":           "査読経験",
    "projects.title":          "プロジェクト（その他・抜粋）",
    "articles.title":          "記事",
    "skills.title":            "スキル",
    "edu.title":               "学歴・職歴",
    "edu.section.education":   "学歴",
    "edu.section.experience":  "職歴（アルバイト等含む・抜粋）",
    "news.title":              "お知らせ",
    "news.fab":                "お知らせ",
    "contact.title":           "連絡先",
    "section.more":            "すべて見る →",
    "subpage.back":            "← ポートフォリオに戻る",
    "wip.text":                "🚧 このサイトは現在制作中です（就活用のポートフォリオです）",
  },
};

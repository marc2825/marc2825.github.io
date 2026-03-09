/* =========================================================
   data.js — All portfolio content & configuration
   ★ Edit only this file to update the entire site. ★
   ========================================================= */

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
  preview: {
    research:  2,   /* research themes */
    papers:    2,   /* papers */
    projects:  2,   /* projects */
    articles:  -1,   /* articles */
    news:      4,   /* news items */
  },

  /* ── Meta ─────────────────────────────────────── */
  name:          "Masahiro Kono (Marc)",
  nameJa:        "河野 将大",
  heroLabel:     "Master's student",
  heroLabelJa:   "修士課程学生",
  affiliation:   "Department of Computer Science, Graduate School of Information Science and Technology · The University of Tokyo",
  affiliationJa: "情報理工学系研究科 コンピュータ科学専攻 · 東京大学 大学院",
  bio:           "I am particularly interested in <strong>creativity support tools and optimization techniques</strong> in the fields of <strong>2D and 3DCG</strong>, as well as <strong>NPR (Non-Photorealistic Rendering)</strong>.",
  bioJa:         "<strong>2D・3DCG</strong>分野における<strong>制作支援や最適化</strong>、ならびに<strong>NPR（Non-Photorealistic Rendering）</strong>表現に特に関心があります。",

  /* ── Links ────────────────────────────────────── */
  links: {
    email:    "your@email.com",
    cv:       "#",
    scholar:  "#",
    github:   "#",
    twitter:  "#",
    linkedin: "#",
  },

  /* ── About ────────────────────────────────────── */
  about: {
    intro:          "I am a PhD student / graduate researcher in [field] at [University]. My work focuses on [research area], aiming to [broader impact or goal].",
    introJa:        "[大学]の[分野]専攻の博士課程学生です。[研究分野]を中心に研究し、[目標や社会的インパクト]を目指しています。",
    history:        "I received my B.Sc. in [field] from [University] in [year]. Before joining my current lab, I worked on [previous experience or internship].",
    historyJa:      "[年]に[大学]の[専攻]を卒業しました。現在の研究室に参加する前は、[前職・インターン等]に取り組んでいました。",
    affiliation:    "Graduate School of [Faculty], [Department], [University]. Advised by Prof. [Supervisor Name]. Member of [Lab Name] Laboratory.",
    affiliationJa:  "[大学] [研究科] [専攻]。[指導教員名]教授に師事。[研究室名]研究室所属。",
  },

  /* ── Research interests ───────────────────────── */
  researchLead:   "My research sits at the intersection of [field A] and [field B]. I am particularly interested in [topics].",
  researchLeadJa: "私の研究は[分野A]と[分野B]の交差点にあります。特に[テーマ]に関心を持っています。",
  research: [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
      title:   "Research Theme 1",
      titleJa: "研究テーマ 1",
      desc:    "Brief description of the first research theme, its methods, and significance.",
      descJa:  "最初の研究テーマの概要、手法、意義について説明します。",
      tags:    ["Topic A", "Topic B"],
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/></svg>`,
      title:   "Research Theme 2",
      titleJa: "研究テーマ 2",
      desc:    "Brief description of the second research theme, its methodology, and potential impact.",
      descJa:  "2番目の研究テーマの概要、方法論、潜在的なインパクトについて説明します。",
      tags:    ["Topic C", "Topic D"],
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>`,
      title:   "Research Theme 3",
      titleJa: "研究テーマ 3",
      desc:    "Brief description of the third research theme and its contribution to the field.",
      descJa:  "3番目の研究テーマとその分野への貢献について説明します。",
      tags:    ["Topic E", "Topic F"],
    },
  ],

  /* ── Publications ─────────────────────────────── */
  papers: [
    {
      title:   "Your Paper Title: A Study of Something Important",
      titleJa: "論文タイトル：重要な事柄の研究",
      authors: "Your Name, Co-author A, Co-author B",
      venue:   "Journal of Important Research, Vol. 12, No. 3, 2025",
      venueJa: "重要研究ジャーナル, Vol. 12, No. 3, 2025",
      year:    2025,
      type:        "journal",
      firstAuthor: true,
      links:   [{ label: "PDF", href: "#" }, { label: "DOI", href: "#" }, { label: "Code", href: "#" }],
    },
    {
      title:   "Another Paper Title: Experiments on a New Method",
      titleJa: "別の論文タイトル：新手法の実験",
      authors: "Your Name, Co-author C",
      venue:   "Proceedings of the Conference on Relevant Topics (CONF 2024)",
      venueJa: "関連トピック会議論文集 (CONF 2024)",
      year:    2024,
      type:        "conference",
      firstAuthor: true,
      links:   [{ label: "PDF", href: "#" }, { label: "Slides", href: "#" }],
    },
    {
      title:   "Preprint Title: Early Findings on a Novel Problem",
      titleJa: "プレプリントタイトル：新しい問題に関する初期知見",
      authors: "Your Name, Co-author D, Co-author E",
      venue:   "arXiv:2024.XXXXX",
      venueJa: "arXiv:2024.XXXXX",
      year:    2024,
      type:        "preprint",
      firstAuthor: false,
      links:   [{ label: "arXiv", href: "#" }],
    },
  ],

  talks: [
    {
      year:    "2025",
      title:   "Talk Title at Conference / Workshop Name",
      titleJa: "会議・ワークショップ名での発表タイトル",
      venue:   "International Conference Name, City, Country",
      venueJa: "国際会議名、都市、国",
    },
    {
      year:    "2024",
      title:   "Invited Talk: Research Overview",
      titleJa: "招待講演：研究概要",
      venue:   "University Seminar / Lab Meeting, University Name",
      venueJa: "大学セミナー / 研究室ミーティング、大学名",
    },
  ],

  /* ── Projects ─────────────────────────────────── */
  projects: [
    {
      title:   "Project Alpha",
      titleJa: "プロジェクト アルファ",
      desc:    "A research tool / software developed to support experiments in [area]. It achieves [key feature or result].",
      descJa:  "[分野]の実験をサポートするために開発した研究ツール。[主要機能や成果]を実現しています。",
      stack:   ["Python", "PyTorch", "NumPy"],
      href:    "#",
    },
    {
      title:   "Project Beta",
      titleJa: "プロジェクト ベータ",
      desc:    "An open-source library / dataset / web application for [purpose]. Used by [N] researchers in [field].",
      descJa:  "[目的]のためのオープンソースライブラリ/データセット/ウェブアプリ。[分野]の研究者[N]名が利用しています。",
      stack:   ["JavaScript", "React", "D3.js"],
      href:    "#",
    },
    {
      title:   "Project Gamma",
      titleJa: "プロジェクト ガンマ",
      desc:    "Coursework / personal project exploring [topic]. Built using [technology stack].",
      descJa:  "[テーマ]を探求した授業/個人プロジェクト。[技術スタック]を使用して構築しました。",
      stack:   ["C++", "CUDA", "CMake"],
      href:    "#",
    },
  ],

  /* ── Articles ─────────────────────────────────── */
  articles: [
    {
      date:    "2025-02",
      dateJa:  "2025年2月",
      title:   "Article Title: Explaining [Research Topic] for a General Audience",
      titleJa: "記事タイトル：[研究テーマ]をわかりやすく解説",
      source:  "Blog / Qiita / Medium",
      href:    "#",
    },
    {
      date:    "2024-11",
      dateJa:  "2024年11月",
      title:   "Technical Note: How I Built [Tool/Method]",
      titleJa: "技術ノート：[ツール/手法]の作り方",
      source:  "GitHub Blog",
      href:    "#",
    },
    {
      date:    "2024-06",
      dateJa:  "2024年6月",
      title:   "Conference Report: Highlights from [Conference Name]",
      titleJa: "学会参加レポート：[学会名]のハイライト",
      source:  "Personal Blog",
      href:    "#",
    },
  ],

  /* ── Skills ───────────────────────────────────── */
  skills: [
    {
      category:   "Certifications",
      categoryJa: "資格",
      items: [
        { name: "Certification A", level: 90 },
        { name: "Certification B", level: 80 },
        { name: "Certification C", level: 70 },
      ],
    },
    {
      category:   "Programming Languages",
      categoryJa: "プログラミング言語",
      items: [
        { name: "Python",      level: 92 },
        { name: "C / C++",    level: 75 },
        { name: "JavaScript", level: 68 },
        { name: "R",          level: 60 },
      ],
    },
    {
      category:   "Tools & Platforms",
      categoryJa: "ツール・環境",
      items: [
        { name: "Git / GitHub", level: 90 },
        { name: "Linux / Bash", level: 85 },
        { name: "Docker",       level: 70 },
        { name: "LaTeX",        level: 80 },
      ],
    },
    {
      category:   "Frameworks & Libraries",
      categoryJa: "フレームワーク・ライブラリ",
      items: [
        { name: "PyTorch",       level: 88 },
        { name: "NumPy / SciPy", level: 85 },
        { name: "scikit-learn",  level: 78 },
        { name: "React",         level: 60 },
      ],
    },
  ],

  /* ── Education & Experience ───────────────────── */
  timeline: [
    {
      period:   "2023 – Present",
      periodJa: "2023年 – 現在",
      title:    "Ph.D. Student in [Field]",
      titleJa:  "博士課程（[専攻]）",
      sub:      "University Name, Graduate School of [Faculty]",
      subJa:    "大学名 [研究科]",
      desc:     "Thesis: [Working title]. Advisor: Prof. [Name]. Research focus on [topic].",
      descJa:   "論文テーマ：[仮題]。指導教員：[名前]教授。[テーマ]に関する研究。",
    },
    {
      period:   "2021 – 2023",
      periodJa: "2021年 – 2023年",
      title:    "Research Assistant / Intern at [Organization]",
      titleJa:  "[機関名]でのリサーチアシスタント・インターン",
      sub:      "Organization Name",
      subJa:    "機関名",
      desc:     "Worked on [project/topic]. Published [N] papers. Collaborated with [team].",
      descJa:   "[プロジェクト/テーマ]に従事。論文[N]本を発表。[チーム]と共同研究。",
    },
    {
      period:   "2019 – 2023",
      periodJa: "2019年 – 2023年",
      title:    "B.Sc. in [Field]",
      titleJa:  "学士（[専攻]）",
      sub:      "University Name",
      subJa:    "大学名",
      desc:     "Graduated with [honors]. Thesis: [Title]. GPA: [X.X/4.0].",
      descJa:   "[優秀賞等]で卒業。卒業論文：[タイトル]。GPA：[X.X/4.0]。",
    },
  ],

  /* ── News ─────────────────────────────────────── */
  news: [
    { date: "2025/02", dateJa: "2025年2月", text: "New paper accepted to [Journal/Conference].",      textJa: "[ジャーナル/会議]に論文が採択されました。" },
    { date: "2024/11", dateJa: "2024年11月", text: "Presented at [Conference Name] in [City].",        textJa: "[都市]で開催された[学会名]で発表しました。" },
    { date: "2024/09", dateJa: "2024年9月",  text: "Received [Scholarship / Award Name].",             textJa: "[奨学金/賞の名前]を受賞しました。" },
    { date: "2024/04", dateJa: "2024年4月",  text: "Started PhD program at [University].",            textJa: "[大学]の博士課程を開始しました。" },
  ],

  /* ── Contact ──────────────────────────────────── */
  contactText:   "I am open to collaborations, research discussions, and general correspondence. Feel free to reach out.",
  contactTextJa: "共同研究や研究に関する議論、お問い合わせなど、お気軽にご連絡ください。",
};

/* ── UI translations ──────────────────────────────────────── */
const I18N = {
  en: {
    "meta.title":              "Portfolio",
    "meta.description":        "Academic portfolio",
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
    "research.title":          "Research",
    "pub.title":               "Publications",
    "pub.tab.papers":          "Papers",
    "pub.tab.talks":           "Talks",
    "pub.filter.all":          "All",
    "pub.filter.journal":      "Journal",
    "pub.filter.conference":   "Conference",
    "pub.filter.preprint":     "Preprint",
    "pub.filter.firstAuthor":  "First Author Only",
    "projects.title":          "Projects",
    "articles.title":          "Articles",
    "skills.title":            "Skills",
    "edu.title":               "Education & Experience",
    "news.title":              "News",
    "news.fab":                "News",
    "contact.title":           "Contact",
    "section.more":            "View All →",
    "subpage.back":            "← Back to Portfolio",
    "wip.text":                "🚧 This site is currently under construction",
  },
  ja: {
    "meta.title":              "ポートフォリオ",
    "meta.description":        "学術ポートフォリオ",
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
    "research.title":          "研究",
    "pub.title":               "出版・発表",
    "pub.tab.papers":          "論文",
    "pub.tab.talks":           "登壇",
    "pub.filter.all":          "すべて",
    "pub.filter.journal":      "ジャーナル",
    "pub.filter.conference":   "会議",
    "pub.filter.preprint":     "プレプリント",
    "pub.filter.firstAuthor":  "筆頭著者のみ",
    "projects.title":          "プロジェクト",
    "articles.title":          "記事",
    "skills.title":            "スキル",
    "edu.title":               "学歴・職歴",
    "news.title":              "お知らせ",
    "news.fab":                "お知らせ",
    "contact.title":           "連絡先",
    "section.more":            "すべて見る →",
    "subpage.back":            "← ポートフォリオに戻る",
    "wip.text":                "🚧 このサイトは現在制作中です",
  },
};

/* Settings for ?view=simplified and the original ?view=simpified link. */
const SIMPLIFIED_VIEW = {
  hiddenSections: ["news"],
  compactDescriptions: true,

  // Return only the fields this view overrides. Nested objects merge; arrays replace.
  overrides(data) {
    const profile = data.about.profile.map(group => {
      if (group.id === "favorite-phrase" && group.values?.length) {
        return {
          ...group,
          values: [],
          value: group.values.map(item => item.title).join(", "),
          valueJP: group.values.map(item => item.titleJP ?? item.title).join("、"),
        };
      }
      if (group.id === "recent-thoughts") return { ...group, full: false };
      return group;
    });
    const timeline = data.timeline.map(item => {
      if (item.id === "kaisei") {
        return { ...item, period: "", periodJP: "", desc: "", descJP: "" };
      }
      if (item.id === "utokyo-science-i") {
        return {
          ...item,
          desc: item.desc.split(" / Entrance Exam:")[0],
          descJP: item.descJP.split(" / Entrance Exam:")[0],
        };
      }
      return item;
    });
    const skills = data.skills.map(group => ({
      ...group,
      items: group.items.map(item => {
        if (!["skill-cert-other", "skill-activities-other"].includes(item.anchorId)) return item;
        return {
          ...item,
          name: "Other",
          nameJP: "その他",
          detail: item.name.replace(/^Others:\s*/, ""),
          detailJP: item.nameJP.replace(/^その他：\s*/, ""),
        };
      }),
    }));
    return { about: { profile }, timeline, skills, news: [] };
  },
};

DATA.views = { simpified: SIMPLIFIED_VIEW, simplified: SIMPLIFIED_VIEW };

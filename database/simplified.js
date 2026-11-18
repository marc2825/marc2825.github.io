/* Settings for ?view=simplified and the original ?view=simpified link. */
const SIMPLIFIED_VIEW = {
  hiddenSections: ["news"],

  // Return only the fields this view overrides. Nested objects merge; arrays replace.
  overrides(data) {
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
    return { timeline, news: [] };
  },
};

DATA.views = { simpified: SIMPLIFIED_VIEW, simplified: SIMPLIFIED_VIEW };

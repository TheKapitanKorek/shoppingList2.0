import elements from "./elements";

const categories = [elements.vegetables, elements.fruits, elements.meat];

export const showHideCategory = () => {
  categories.forEach((el) => {
    const hasChildren = el.querySelector(".list").children.length > 0;
    const labelClassList = el.querySelector(".label").classList;
    if (hasChildren && labelClassList.contains("hidden")) {
      labelClassList.remove("hidden");
    } else if (!hasChildren && !labelClassList.contains("hidden")) {
      labelClassList.add("hidden");
    }
  });
};

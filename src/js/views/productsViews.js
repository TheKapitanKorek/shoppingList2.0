import elements from "./elements";

export const getInput = () => {
  const what = elements.inputSwitch.checked;
  const name = elements.inputName.value;
  const weight = what === true ? elements.inputUnit.value : "";
  const quantity = what === false ? elements.inputUnit.value : "";
  const category = elements.inputCategory.value;
  return { name, weight, quantity, category };
};
export const displayProduct = (id, name, quantity, weight, category) => {
  const parent = document.getElementById(category).querySelector(".list");
  const DOMElement = `
  <li class="item" product_id=${id}>
  <div class="product">${name}</div>
  <div class="weight">${weight}${weight ? "kg" : "  "}</div>
  <div class="quantity">${quantity}</div>
  <div class="edit_delete">
    <button aria-label="Edytuj" class="edit">
      <img src="./images/edit.svg" alt="edytuj" />
    </button>
    <button aria-label="Usuń" class="delete">
      <img src="./images/bin.svg" alt="kosz" />
    </button>
  </div>
</li>`;
  parent.insertAdjacentHTML("beforeend", DOMElement);
};
export const viewDeleteProduct = (product_id) => {
  const element = document.querySelector('[product_id="' + product_id + '"]');
  element.parentNode.removeChild(element);
};
export const clearInputs = () => {
  elements.inputName.value = "";
  elements.inputUnit.value = "";
  elements.inputSwitch.checked = false;
};
export const insertProductToInputs = ({ name, quantity, weight, category }) => {
  if (weight) {
    elements.inputSwitch.checked = false;
    elements.inputUnit.value = weight;
  } else {
    elements.inputUnit.value = quantity;
  }
  elements.inputName.value = name;
  elements.inputCategory.value = category;
};
export const highlightProduct = (product_id) => {
  const element = document.querySelector('[product_id="' + product_id + '"]');
  element.classList.add("selected");
};
export const removeHighlight = () => {
  const element = document.querySelector(".selected");
  if (element) {
    element.classList.remove("selected");
  }
};

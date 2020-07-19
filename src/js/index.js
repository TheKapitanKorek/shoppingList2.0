//CONTROL ADD  PRODUCT
import Product from "./models/Product";
import List from "./models/List";

import elements from "./views/elements";
import {
  getInput,
  displayProduct,
  viewDeleteProduct,
  clearInputs,
} from "./views/productsViews";
import { showHideCategory } from "./views/categoryViews";

const setupEventListeners = () => {
  //add delete and edit event listeners
  elements.productList.addEventListener("click", (event) => {
    if (event.target.src) {
      if (event.target.parentNode.classList[0] === "delete") {
        console.log("yes");
        console.log(
          event.target.parentNode.parentNode.parentNode.getAttribute(
            "product_id"
          )
        );
        controlDeleteProduct(
          event.target.parentNode.parentNode.parentNode.getAttribute(
            "product_id"
          )
        );
      } else if (event.target.parentNode.classList[0] === "edit") {
        controlEditProductInit();
      }
    }
  });
  //add submit button event listener
  elements.submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    controlAddProduct();
  });
};

const getList = () => {
  const list = window.localStorage.getItem("mdb_shopping_list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
};
const setList = (list) => {
  window.localStorage.setItem("mdb_shopping_list", JSON.stringify(list));
};

const controlAddProduct = () => {
  //1) gather form info
  const { name, weight, quantity, category } = getInput();
  //1.1) create new product id
  const id = list.getNewId();
  //2) create new product object and add it to the list
  const product = new Product(id, name, quantity, weight, category);

  list.addItem(product);
  //3) render product
  displayProduct(id, name, quantity, weight, category);
  //4) clear inputs
  clearInputs();
  //5)update local storage
  setList(list.productList);
};

const controlDeleteProduct = (id) => {
  //1)delete product from the list
  list.removeItem(id);
  //2)delete the product from display list
  viewDeleteProduct(id);
  //3)update local storage
  setList(list.productList);
};

const controlCategories = () => {
  //1) check if category is empty
  //2) if yes hide it, if no show it
};
const controlEditProductInit = () => {
  //1) get edited product id
  //2) highlight it and insert its info into the form
  //3) change event listner callback to button to controlEditProduct
};
const controlEditProduct = () => {
  //1)delete product
  //2)add product
};
setupEventListeners();
const list = new List(getList());

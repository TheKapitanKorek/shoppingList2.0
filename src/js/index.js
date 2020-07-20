import Product from "./models/Product";
import List from "./models/List";

import elements from "./views/elements";
import {
  getInput,
  displayProduct,
  viewDeleteProduct,
  clearInputs,
  insertProductToInputs,
  highlightProduct,
  removeHighlight,
} from "./views/productsViews";
import { showHideCategory } from "./views/categoryViews";
import { updateSums } from "./views/sumViews";

let edited_product_id = undefined;

const setupEventListeners = () => {
  //add delete and edit event listeners
  elements.productList.addEventListener("click", (event) => {
    if (event.target.src) {
      if (event.target.parentNode.classList[0] === "delete") {
        controlDeleteProduct(
          event.target.parentNode.parentNode.parentNode.getAttribute(
            "product_id"
          )
        );
      } else if (event.target.parentNode.classList[0] === "edit") {
        controlEditProductInit(
          event.target.parentNode.parentNode.parentNode.getAttribute(
            "product_id"
          )
        );
      }
    }
  });

  //add submit button event listener
  elements.submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (edited_product_id) {
      controlEditProduct();
    } else {
      controlAddProduct();
    }
  });
};

/*---- LOCAL STORAGE FUNCTIONS ----*/

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

/*---- APP CONTROLLERS ----*/

const clearApp = () => {
  //clear selected product
  edited_product_id = undefined;
  removeHighlight();

  showHideCategory();
  clearInputs();
};

const controlUpdateSums = () => {
  const wtSum = list.getSum("weight");
  const qtSum = list.getSum("quantity");
  updateSums(wtSum, qtSum);
};

const controlAddProduct = () => {
  //1) gather form info and check if it matches the requirements
  const { name, weight, quantity, category } = getInput();
  if (!name || (!weight && !quantity)) {
    return;
  }
  //1.1) create new product id
  const id = list.getNewId();

  //2) create new product object and add it to the list
  const product = new Product(id, name, quantity, weight, category);
  list.addItem(product);

  //3) render product
  displayProduct(id, name, quantity, weight, category);

  //4) clear app
  clearApp();
  controlUpdateSums();

  //5)update local storage
  setList(list.productList);
};

const controlDeleteProduct = (product_id) => {
  //1)delete product from the list
  list.removeItem(product_id);

  //2)delete the product from display list
  viewDeleteProduct(product_id);
  showHideCategory();
  controlUpdateSums();

  //3)update local storage
  setList(list.productList);
};
const controlEditProductInit = (product_id) => {
  //1) clear app
  clearApp();
  //2) get edited product
  const product = list.getProductById(product_id);

  //3) asign ist id to external variable and insert its info into the form
  highlightProduct(product_id);
  insertProductToInputs(product);
  edited_product_id = product_id;
};
const controlEditProduct = () => {
  //1)delete product
  list.removeItem(edited_product_id);
  viewDeleteProduct(edited_product_id);

  //2)add product
  const { name, weight, quantity, category } = getInput();
  if (!name || (!weight && !quantity)) {
    return;
  }
  const id = edited_product_id;
  const product = new Product(id, name, quantity, weight, category);
  list.addItem(product);
  displayProduct(id, name, quantity, weight, category);

  //3) clear app
  clearApp();
  controlUpdateSums();

  //4)update local storage
  setList(list.productList);
};
const controlRenderList = () => {
  list.productList.forEach((el) => {
    displayProduct(el.id, el.name, el.quantity, el.weight, el.category);
  });
};

/*----APP STARTUP----*/

setupEventListeners();
const list = new List(getList());
controlRenderList();
controlUpdateSums();
showHideCategory();

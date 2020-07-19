export default class List {
  constructor(productList) {
    this.productList = productList;
  }
  addItem(item) {
    this.productList.push(item);
  }
  removeItem(id) {
    const index = this.productList.findIndex((el) => el.id == id);
    this.productList.splice(index, 1);
  }
  getNewId() {
    if (this.productList[0]) {
      return this.productList[this.productList.length - 1].id + 1;
    }
    return 1;
  }
  getWeightSum() {
    return this.productList.map((el) => el.weight).reduce((a, b) => a + b);
  }
  getQuantitySum() {
    return this.productList.map((el) => el.quantity).reduce((a, b) => a + b);
  }
}

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
  getSum(what) {
    if (this.productList.length > 1) {
      return this.productList
        .map((el) => el[what])
        .reduce((a, b) => (a ? a : 0 + b ? b : 0));
    } else if (this.productList.length === 1) {
      const num = this.productList[0][what];
      return num ? num : 0;
    } else {
      return 0;
    }
  }
  getProductById(id) {
    const index = this.productList.findIndex((el) => el.id == id);
    return this.productList[index];
  }
}

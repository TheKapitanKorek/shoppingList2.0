export default class Product {
  constructor(id, name, quantity, weight, category) {
    this.id = id;
    this.name = name;
    this.quantity = parseInt(quantity);
    this.weight = parseInt(weight);
    this.category = category;
  }
}

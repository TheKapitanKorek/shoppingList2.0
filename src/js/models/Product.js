export default class Product {
  constructor(id, name, quantity, weight, category) {
    this.id = id;
    this.name = name;
    this.quantity = quantity ? parseInt(quantity) : undefined;
    this.weight = weight ? parseInt(weight) : undefined;
    this.category = category;
  }
}

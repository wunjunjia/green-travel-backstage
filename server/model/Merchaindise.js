class Merchandise {
  constructor({
    id,
    name,
    integral,
    path,
    description,
  }) {
    this.id = id;
    this.name = name;
    this.integral = integral;
    this.path = path;
    this.description = description;
  }
}

module.exports = Merchandise;
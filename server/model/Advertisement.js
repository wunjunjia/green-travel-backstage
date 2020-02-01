class Advertisement {
  constructor({
    id,
    path,
    create_time = new Date(),
    status = 0,
  }) {
    this.id = id;
    this.path = path;
    this.create_time = create_time;
    this.status = status;
  }
}

module.exports = Advertisement;
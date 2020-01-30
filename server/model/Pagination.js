class Pagination {
  constructor({
    pageSize,
    currentPage,
    total,
  }) {
    this.pageSize = parseInt(pageSize);
    this.currentPage = parseInt(currentPage)
    this.total = total;
  }
}

module.exports = Pagination;
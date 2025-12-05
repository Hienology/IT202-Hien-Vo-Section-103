// Product Service - Pure JavaScript
class ProductService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  async getProducts() {
    return await this.httpService.get('products');
  }

  async getProduct(id) {
    return await this.httpService.get(`products/${id}`);
  }

  async createProduct(product) {
    return await this.httpService.post('products', product);
  }

  async updateProduct(id, product) {
    return await this.httpService.put(`products/${id}`, product);
  }

  async deleteProduct(id) {
    return await this.httpService.delete(`products/${id}`);
  }
}

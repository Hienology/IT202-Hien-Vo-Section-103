// Product List Component - Pure JavaScript
class ProductListComponent {
  constructor(productService, httpService) {
    this.productService = productService;
    this.httpService = httpService;
    this.products = [];
    this.loading = false;
    this.error = '';
  }

  async init() {
    await this.loadProducts();
    this.render();
  }

  async loadProducts() {
    this.loading = true;
    this.render();
    
    try {
      this.products = await this.productService.getProducts();
      this.loading = false;
      this.error = '';
    } catch (err) {
      this.error = 'Failed to load products';
      this.loading = false;
      console.error(err);
    }
    
    this.render();
  }

  async onBuyNow(product) {
    try {
      // Send selected product to backend
      await this.httpService.post('select-product', { productId: product.id });
      
      // Navigate to review page
      document.getElementById('product-list-section').style.display = 'none';
      document.getElementById('order-review-section').style.display = 'block';
      
      // Initialize order review component
      if (window.orderReviewComponent) {
        window.orderReviewComponent.init();
      }
    } catch (err) {
      console.error('Failed to select product:', err);
      alert('Failed to select product. Please try again.');
    }
  }

  render() {
    const container = document.getElementById('product-list-container');
    if (!container) return;

    if (this.loading) {
      container.innerHTML = `
        <div class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading products...</span>
          </div>
          <p class="mt-3 text-muted">Loading products...</p>
        </div>
      `;
      return;
    }

    if (this.error) {
      container.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <i class="bi bi-exclamation-triangle-fill"></i> ${this.error}
        </div>
      `;
      return;
    }

    if (this.products.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-inbox display-1 text-muted"></i>
          <p class="mt-3 text-muted">No products available at the moment.</p>
        </div>
      `;
      return;
    }

    const productsHTML = this.products.map(product => `
      <div class="col">
        <div class="card h-100 shadow-sm hover-card">
          <img src="${product.imageUrl}" alt="${product.name}" class="card-img-top product-image">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text text-muted flex-grow-1">${product.description}</p>
            <div class="mt-auto">
              <h4 class="text-primary mb-3">$${product.price.toFixed(2)}</h4>
              <button class="btn btn-success w-100" onclick="window.productListComponent.onBuyNow(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                <i class="bi bi-cart-check"></i> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        ${productsHTML}
      </div>
    `;
  }
}

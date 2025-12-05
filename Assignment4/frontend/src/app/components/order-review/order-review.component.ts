// Order Review Component - Pure JavaScript
class OrderReviewComponent {
  constructor(httpService) {
    this.httpService = httpService;
    this.selectedProduct = null;
    this.submitting = false;
    this.showConfirmation = false;
    this.orderDetails = null;
  }

  async init() {
    // Fetch selected product from backend
    try {
      this.selectedProduct = await this.httpService.get('selected-product');
    } catch (err) {
      console.error('Failed to load selected product:', err);
      this.selectedProduct = null;
    }
    this.render();
    this.attachEventListeners();
  }

  async submitOrder() {
    if (!this.selectedProduct) {
      alert('No product selected');
      return;
    }

    this.submitting = true;
    this.render();

    try {
      const response = await this.httpService.post('submit-order', {});
      console.log('Order submitted successfully:', response);
      this.orderDetails = response;
      this.showConfirmation = true;
      this.submitting = false;
      this.render();
    } catch (err) {
      console.error('Order submission failed:', err);
      alert('Failed to submit order. Please try again.');
      this.submitting = false;
      this.render();
    }
  }

  backToProducts() {
    this.showConfirmation = false;
    this.selectedProduct = null;
    document.getElementById('order-review-section').style.display = 'none';
    document.getElementById('product-list-section').style.display = 'block';
    if (window.productListComponent) {
      window.productListComponent.init();
    }
  }

  attachEventListeners() {
    const submitBtn = document.getElementById('submit-order-btn');
    const backBtn = document.getElementById('back-to-products-btn');
    const cancelBtn = document.getElementById('cancel-order-btn');

    if (submitBtn) submitBtn.onclick = () => this.submitOrder();
    if (backBtn) backBtn.onclick = () => this.backToProducts();
    if (cancelBtn) cancelBtn.onclick = () => this.backToProducts();
  }

  render() {
    const container = document.getElementById('order-review-container');
    if (!container) return;

    if (this.showConfirmation) {
      container.innerHTML = `
        <div class="confirmation-section">
          <div class="card shadow-lg border-success">
            <div class="card-body text-center py-5">
              <div class="success-icon mb-4">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 5rem;"></i>
              </div>
              <h1 class="display-4 text-success mb-3">Order Confirmed!</h1>
              <p class="lead text-muted mb-4">${this.orderDetails?.message || 'Thank you for your purchase.'}</p>
              
              <div class="order-summary-box mx-auto" style="max-width: 600px;">
                <div class="card bg-light">
                  <div class="card-body">
                    <h5 class="card-title mb-3">Order Details</h5>
                    <div class="row mb-2">
                      <div class="col-6 text-start"><strong>Order ID:</strong></div>
                      <div class="col-6 text-end">#${this.orderDetails?.orderId}</div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-6 text-start"><strong>Product:</strong></div>
                      <div class="col-6 text-end">${this.orderDetails?.product?.name}</div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-6 text-start"><strong>Quantity:</strong></div>
                      <div class="col-6 text-end">1</div>
                    </div>
                    <hr>
                    <div class="row mb-3">
                      <div class="col-6 text-start"><strong>Total:</strong></div>
                      <div class="col-6 text-end"><h4 class="text-primary mb-0">$${this.orderDetails?.total?.toFixed(2)}</h4></div>
                    </div>
                    <div class="alert alert-info mb-0">
                      <i class="bi bi-truck"></i> ${this.orderDetails?.deliveryMessage || 'We will deliver soon'}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <button class="btn btn-primary btn-lg mt-3" id="back-to-products-btn">
                  <i class="bi bi-arrow-left"></i> Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      this.attachEventListeners();
      return;
    }

    if (!this.selectedProduct) {
      container.innerHTML = `
        <div class="alert alert-warning text-center" role="alert">
          <i class="bi bi-exclamation-triangle"></i> No product selected. Please go back and select a product.
        </div>
        <div class="text-center mt-3">
          <button class="btn btn-primary" id="back-to-products-btn">
            <i class="bi bi-arrow-left"></i> Back to Products
          </button>
        </div>
      `;
      this.attachEventListeners();
      return;
    }

    container.innerHTML = `
      <div class="text-center mb-4">
        <h1 class="display-5">Review Your Order</h1>
        <p class="lead text-muted">Please review your product selection before submitting</p>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0"><i class="bi bi-box-seam"></i> Selected Product</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-5">
                  <img src="${this.selectedProduct.imageUrl}" alt="${this.selectedProduct.name}" class="img-fluid rounded mb-3">
                </div>
                <div class="col-md-7">
                  <h3>${this.selectedProduct.name}</h3>
                  <p class="text-muted">${this.selectedProduct.description}</p>
                  <hr>
                  <div class="mb-3">
                    <strong>Price:</strong> <span class="text-primary fs-4">$${this.selectedProduct.price.toFixed(2)}</span>
                  </div>
                  <div class="mb-3">
                    <strong>Quantity:</strong> <span class="badge bg-secondary">1</span>
                  </div>
                  <hr>
                  <div class="p-3 bg-light rounded">
                    <div class="d-flex justify-content-between align-items-center">
                      <h5 class="mb-0">Total:</h5>
                      <h3 class="text-primary mb-0">$${this.selectedProduct.price.toFixed(2)}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-grid gap-2 mt-4">
                <button type="button" class="btn btn-success btn-lg" id="submit-order-btn" ${this.submitting ? 'disabled' : ''}>
                  ${this.submitting ? 
                    '<span class="spinner-border spinner-border-sm me-2"></span>Processing...' : 
                    '<i class="bi bi-check-circle"></i> Submit Order'
                  }
                </button>
                <button type="button" class="btn btn-outline-secondary" id="cancel-order-btn" ${this.submitting ? 'disabled' : ''}>
                  <i class="bi bi-x-circle"></i> Cancel & Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.attachEventListeners();
  }
}

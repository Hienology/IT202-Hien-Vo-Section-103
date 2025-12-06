import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { HttpService } from './services/http.service';
import { ProductService } from './services/product.service';

// Global error handler to catch uncaught errors
@Injectable()
class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global error caught:', error);
    // Show user-friendly message for uncaught errors
    alert('An unexpected error occurred. Please try again or refresh the page.');
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    OrderReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    HttpService,
    ProductService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

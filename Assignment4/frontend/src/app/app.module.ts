import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
    console.error('An unexpected error occurred:', error);
    console.error('Error details:', error.message || error);
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
    CommonModule,
    HttpClientModule,
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

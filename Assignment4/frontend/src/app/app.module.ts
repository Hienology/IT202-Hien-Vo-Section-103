import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { HttpService } from './services/http.service';
import { ProductService } from './services/product.service';

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
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

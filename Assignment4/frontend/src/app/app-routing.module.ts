import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'review', component: OrderReviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { ModalModule } from 'ngx-bootstrap/modal'
import { ConsultProductComponent } from './consult-product/consult-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreatProductComponent } from './creat-product/creat-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ConsultProductComponent,
    CreatProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
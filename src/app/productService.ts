import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrlAllProduct = environment.baseUrALLProduct;
  private baseUrlProduct = environment.baseUrlProduct;
  private baseUrlProductById = environment.baseUrlProductById;
  private baseUrlProductUpdate = environment.baseUrlProductUpdate;
  private baseUrlProductCreate = environment.baseUrlProductCreate;
  private baseUrlProductDelete = environment.baseUrlProductDelete;
  private baseUrlCommon = environment.baseUrlCommon;

  constructor(private http: HttpClient) { }

   getProductById(id: number): Observable<any> {
     return this.http.get(`${this.baseUrlCommon}${id}`);
   }

   createProdutct(product: Object): Observable<Object> {
     return this.http.post(`${this.baseUrlCommon}`, product);
   }

   updateProduct(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrlCommon}${id}`, value);
   }

   deleteProduct(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrlCommon}${id}`, { responseType: 'text' });
   }

  getProduct(nome: String, categoria: String): Observable<any>  {

    if (nome != '' && (categoria === '')) {
      return this.http.get(`${this.baseUrlProduct}nomeProduto/${nome}`);
    } else if (categoria != '' && (nome === '')) {
      return this.http.get(`${this.baseUrlProduct}categoria/${categoria}`);
    }
    return null;
  }

  getAllProduct(getAll: String) : Observable<any> {
    console.log(getAll);
    return this.http.get(`${this.baseUrlAllProduct}`);
  }
}

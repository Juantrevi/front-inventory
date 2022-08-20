import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


//Get all the products
getProducts(){

  const endpoint = `${base_url}/products`;
  return this.http.get(endpoint);

  }

// save the products
saveProducts(body: any){
    const endpoint = `${base_url}/products`;
return this.http.post(endpoint, body);
}

//Update product
updateProduct(body: any, id: any){
    const endpoint = `${base_url}/products/ ${id}`;
    return this.http.put(endpoint, body);
}

//delete product
deleteProduct(id: any){
    const endpoint = `${base_url}/products/ ${id}`;
    return this.http.delete(endpoint);
}
}

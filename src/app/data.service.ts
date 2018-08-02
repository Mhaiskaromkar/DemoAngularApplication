import { Injectable } from '@angular/core';
import {  Http, Response, Headers,RequestMethod, RequestOptions } from '@angular/http';
// import { Observable} from 'rxjs/Observable';
import { productcategory } from 'src/app/_interfaces/ProductCategory.model'

// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private _getProductCategoryUrl = "/Contact/GetContacts";
  public _saveProductCategoryUrl: string = '/Contact/SaveContact/';
  public _updateProductCategoryUrl: string = '/Contact/UpdateContact/';
  public _deleteProductCategoryByIdUrl: string = '/Contact/DeleteContactByID/';



  constructor(private http: Http) { }

  getCategoryInfo()
  {

    //return this.http.get('this is my url').Map() ;
  }


  // postEmployee(emp : productcategory, ){
  //   var body = JSON.stringify(emp);
  //   var headerOptions = new Headers({'Content-Type':'application/json'});
  //   var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
  //   return this.http.post('http://localhost:28750/api/Employee',body,requestOptions).map(x => x.json());
  // }
}

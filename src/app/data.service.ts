import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { Observable} from 'rxjs/Observable';

import { fromEventPattern } from 'rxjs';

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
}

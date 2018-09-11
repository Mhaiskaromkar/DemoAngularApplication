import { Injectable } from '@angular/core';

import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {
  private _regroute: string = "api/Accounts/Register"; 
  private _logroute: string = "api/Accounts/login"; 
  public get route(): string {
    return this._regroute;
  }
  public set route(value: string) {
    this._regroute = value;
  }
     
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
  


  public register( body)
  {   
   
    //  let body = JSON.stringify({ email, password, firstName, lastName,location });
    //  let headersobj = new Headers({ 'Content-Type': 'application/json' });
    //  let options = new RequestOptions({ headers : headersobj });

    //   return this.http.post(this.envUrl.urlAddress + "/accounts", body, options)
    //     .map(res => true)
    //     .catch(this.handleError);
    console.log(JSON.stringify(body));
    return this.http.post(this.createCompleteRoute(this._regroute, this.envUrl.urlAddress), JSON.stringify(body), this.generateHeaders());
  }
  public login( body)
  {   
   
    console.log(JSON.stringify(body));
    return this.http.post(this.createCompleteRoute(this._logroute, this.envUrl.urlAddress), JSON.stringify(body), this.generateHeaders())
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user ) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;
  }));
  }

private createCompleteRoute(route: string, envAddress: string) {
  return `${envAddress}/${route}`;
}

private generateHeaders() {
  return {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
}
}

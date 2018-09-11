import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { MenuComponent } from './menu/menu.component';
import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { BsModalModule } from 'ng2-bs3-modal';
import { ReactiveFormsModule } from '@angular/forms';  
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountModule } from './account/account.module';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    MenuComponent
   
  ],
  imports: [
    BrowserModule, 
    AccountModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([  

      {path: 'home' ,component:HomeComponent},
      {path: 'product' ,component:ProductComponent},
      // { path: '404', component : NotFoundComponent},
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]),
    HttpModule,BsModalModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [EnvironmentUrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }


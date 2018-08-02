import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service'  
import { MenuComponent } from './menu/menu.component';
import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { BsModalModule } from 'ng2-bs3-modal';
import { ReactiveFormsModule } from '@angular/forms';  
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    MenuComponent 
  ],
  imports: [
    BrowserModule, 
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
    ToastrModule.forRoot()
  ],
  providers: [DataService,EnvironmentUrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }

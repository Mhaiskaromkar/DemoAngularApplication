import { Component, OnInit, ViewChild } from '@angular/core';
import { RepositoryService } from '../shared/services/repository.service';
import { ProductCategory } from '../_interfaces/ProductCategory.model';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DBOperation } from '../shared/services/enum';
import { BsModalComponent } from 'ng2-bs3-modal';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('modal') modal: BsModalComponent; 


  public ProductCategories: ProductCategory[];
  indLoading: boolean = false;  
//   productcategoryfrm: FormGroup;  

ProdCateForm: FormGroup;  
  dbops: DBOperation;  
  modalTitle: string;  
  modalBtnTitle: string; 
  msg: string;   
  ProductCategory: ProductCategory;  
   constructor(private fb: FormBuilder, private repository: RepositoryService) { }

  ngOnInit() {
    
    this.ProdCateForm = this.fb.group({  
      producttype: [''],  
      description: [''] ,
      updatedby: [''],  
    //   lastupdatedate: [],  
    //   isactive: [''],
  });  
    this.getAllProductCategory();
  }

  public getAllProductCategory()
  {
    let apiAddress: string = "api/prodCategory";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.ProductCategories = res as ProductCategory[];

       this.indLoading = false; 
     console.log(JSON.stringify(res));
    //this.repository.getData(apiAddress).subscribe(result => { this.ProductCategories =result as ProductCategory[]
    });
  } 


  addproductcategory() {  
    this.dbops = DBOperation.create;  
    this.SetControlsState(true);  
    this.modalTitle = "Add New Product Category";  
    this.modalBtnTitle = "Add";  
    this.ProdCateForm.reset();  
    this.modal.open();
}  

editproductcategory(categoryId: number) {
    console.log(categoryId);
  this.dbops = DBOperation.update;
  this.SetControlsState(true);
  this.modalTitle = "Edit User";
  this.modalBtnTitle = "Update";
  //this.ProductCategory = this.ProductCategories.filter(x => x.categoryId == id)[0];

  let apiAddress: string = "api/prodCategory/ ${categoryId} ";
  this.repository.getData(apiAddress)
  .subscribe(res => {
    this.ProductCategory = res as ProductCategory;

     this.indLoading = false; 
   console.log(JSON.stringify(res));
  //this.repository.getData(apiAddress).subscribe(result => { this.ProductCategories =result as ProductCategory[]
  });


  this.ProdCateForm.setValue(this.ProductCategory);
  this.modal.open();
}

onSubmit(ProdCateForm : any) {
      
  this.msg = "";  
  let apiAddress: string ;
  switch (this.dbops) {  
      case DBOperation.create:      
      apiAddress= "api/prodCategory/Create";
      console.log(ProdCateForm);
     console.log( this.ProdCateForm.value);
      this.repository.create(apiAddress, this.ProdCateForm.value).subscribe(data => {  
          
        if (data == 1) //Success    
              {  
                  console.log(data);
                  this.msg = "Data successfully added.";  
                  this.getAllProductCategory();  
              } else { 
                console.log(data); 
                  this.msg = "There is some issue in saving records, please contact to system administrator!"  
              }  
              this.modal.dismiss();  
          }, error => {  
              this.msg = error;  
          });  
          break;  
      case DBOperation.update:  
      apiAddress= "api/prodCategory/Put";
          this.repository.update(apiAddress,  this.ProdCateForm.value).subscribe(data => {  
              if (data == 1) //Success    
              {  
                  this.msg = "Data successfully updated.";  
                  this.getAllProductCategory();  
              } else {  
                  this.msg = "There is some issue in saving records, please contact to system administrator!"  
              }  
              this.modal.dismiss();  
          }, error => {  
              this.msg = error;  
          });  
          break;  
      case DBOperation.delete: 
      //apiAddress= "api/prodCategory/Delete";
      
      apiAddress= "api/owner/";//+  this.productcategoryfrm.AlbumId;
          this.repository.delete(apiAddress).subscribe(data => {  
              if (data == 1) //Success    
              {  
                  this.msg = "Data successfully deleted.";  
                  this.getAllProductCategory();  
              } else {  
                  this.msg = "There is some issue in saving records, please contact to system administrator!"  
              }  
              this.modal.dismiss();  
          }, error => {  
              this.msg = error;  
          });  
          break;  
  }  
} 

SetControlsState(isEnable: boolean) {  
  isEnable ? this.ProdCateForm.enable() : this.ProdCateForm.disable();  
}  


  


}

import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { productcategory } from '../_interfaces/ProductCategory.model';
import { RepositoryService } from '../shared/services/repository.service';
import { DBOperation } from '../shared/services/enum';
import { BsModalComponent } from 'ng2-bs3-modal';
import { ToastrService } from 'ngx-toastr'



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('modal') modal: BsModalComponent; 


  public ProductCategories: productcategory[];
  indLoading: boolean = false;  
//   productcategoryfrm: FormGroup;  

ProdCateForm: FormGroup;  
  dbops: DBOperation;  
  modalTitle: string;  
  modalBtnTitle: string; 
  msg: string;   
  productcategory: productcategory;  

 

   constructor(private fb: FormBuilder, private repository: RepositoryService, private toastr: ToastrService) { }

  ngOnInit() {
    
    this.ProdCateForm = this.fb.group({  
        categoryId:[0], 
        productType: [''],  
        updatedBy: [''],  
      description: [''] ,
      lastUpdatedDate: [],  
      isActive: [''],
  });  
    this.getAllProductCategory();
  }

  public getAllProductCategory()
  {
    let apiAddress: string = "api/prodCategory";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.ProductCategories = res as productcategory[];

      // initialize to page 1
    // this.setPage(1);
       this.indLoading = false; 
     
     
    //this.repository.getData(apiAddress).subscribe(result => { this.ProductCategories =result as ProductCategory[]
    });
  } 

//   setPage(page: number) {
//     // get pager object from service
//     this.pager = this.pagerService.getPager(this.ProductCategories.length, page);

//     // get current page of items
//     this.pagedItems = this.ProductCategories.slice(this.pager.startIndex, this.pager.endIndex + 1);
// }


  addproductcategory() {  
    this.dbops = DBOperation.create;  
    this.SetControlsState(true);  
    this.modalTitle = "Add New Product Category";  
    this.modalBtnTitle = "Add";  
    this.ProdCateForm.reset();  
    this.modal.open();
}  

editproductcategory(categoryId) {
  this.dbops = DBOperation.update;
  this.ProdCateForm.reset(); 
  this.SetControlsState(true);
  this.modalTitle = "Edit User";
  this.modalBtnTitle = "Update";
  this.productcategory = this.ProductCategories.filter(x => x.categoryId == categoryId)[0];
  this.ProdCateForm.setValue(this.productcategory);
  this.modal.open();
}

deleteproductcategory(categoryId) {  
    this.dbops = DBOperation.delete;  
    this.SetControlsState(false);  
    this.modalTitle = "Confirm to Delete?";  
    this.modalBtnTitle = "Delete";  
    this.productcategory = this.ProductCategories.filter(x => x.categoryId == categoryId)[0];
    this.ProdCateForm.setValue(this.productcategory);  
    this.modal.open();  
}  

resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    
  }

onSubmit(ProdCatForm) {
      
  this.msg = "";  
  let apiAddress: string ;
  switch (this.dbops) {  
      case DBOperation.create:      
      apiAddress= "api/prodCategory";
   
      this.repository.create(apiAddress, this.ProdCateForm.value).subscribe(data => {  
          console.log(data);
         
          //this.ProdCatForm.reset();
            this.getAllProductCategory();  
            this.toastr.success('New Record Added Succcessfully', 'Product Added');
            this.modal.dismiss();
          }, error => {  
            this.toastr.error('There is some issue in saving records, please contact to system administrator!', 'Product Added');
          });  
          break;  
      case DBOperation.update:  
      apiAddress= "api/prodCategory";
      
      console.log( this.ProdCateForm.value);

          this.repository.create(apiAddress,  this.ProdCateForm.value).subscribe(data => {  
            console.log(data);
            //this.resetForm(this.ProdCateForm);
            this.getAllProductCategory();  
            this.toastr.success('Record Updated Succcessfully.', 'Product Updated');
            this.modal.dismiss();
          }, error => {  
            this.toastr.error('There is some issue in saving records, please contact to system administrator!', 'Product Updated');
          });   
          break;  
      case DBOperation.delete: 

      
      apiAddress= "api/prodCategory/"+  this.ProdCateForm.value.categoryId
      console.log(apiAddress);
          this.repository.delete(apiAddress).subscribe(data => {  
            console.log(data);
            //this.resetForm(this.ProdCateForm);
            this.getAllProductCategory();  
            this.toastr.success('Record Deleted Succcessfully.', 'Product Deleted');
            this.modal.dismiss();
          }, error => {  
            this.toastr.error('There is some issue in saving records, please contact to system administrator!', 'Product Deleted');
          });  
          break;  
  }  
} 

SetControlsState(isEnable: boolean) {  
  isEnable ? this.ProdCateForm.enable() : this.ProdCateForm.disable();  
}  


  


}

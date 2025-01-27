import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';


// {} [] *


@Component({
  selector: 'app-add-product',
  standalone: false,
  
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent {
  productForm: FormGroup;
  productCategory: categoryGroup[] = [
    {
      name: 'Mobiles, Laptops & More',
      categories: [
        {value: 'laptop', viewValue: 'Laptop'},
        {value: 'mobile', viewValue: 'Mobiles'},
        {value: 'powerBanks', viewValue: 'Power Banks'},
        {value: 'wearable', viewValue: 'Wearable Devices'},
      ],
    },
    {
      name: 'Appliances',
      categories: [
        {value: 'ac', viewValue: 'Air Conditioners'},
        {value: 'refrigerator', viewValue: 'Refrigerators'},
        {value: 'washingMachine', viewValue: 'Washing Machines'},
      ],
    },
    {
      name: 'TV, Audio & Cameras',
      // disabled: true,
      categories: [
        {value: 'tv', viewValue: 'Televisions'},
        {value: 'speaker', viewValue: 'Speakers'},
        {value: 'camera', viewValue: 'Cameras'},
      ],
    },
    {
      name: 'Fashion',
      categories: [
        {value: 'men', viewValue: "Men's Fashion"},
        {value: 'female', viewValue: "Female's Fashion"},
      ],
    },
  ];

  constructor(private fb: FormBuilder, private productService: ProductService, private snackBar: MatSnackBar){
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      manufactureDate: [''],
      stockStatus: ['', Validators.required],
      discount: [null, [Validators.min(0), Validators.max(100)]],
      description: ['', [Validators.maxLength(200)]],
      image: ['']
    })
    
  }
  onSubmitForm(){
    if(this.productForm.valid){
      console.log(this.productForm.value)
      this.productService.addProduct(this.productForm.value).subscribe({
        next:(val: any)=>{
          this.snackBar.open('Product Added Succesfully', 'Close', {duration: 3000});
        },
        error:(err) =>{
          console.log(err)
        }
      })
      
      this.productForm.reset();
    }
    else{
      this.snackBar.open('Please fill out all required fields!!!', 'close', {duration: 3000})
    }
  }
}
interface category {
  value: string;
  viewValue: string;
}
interface categoryGroup {
  disabled?: boolean;
  name: string;
  categories: category[];
}

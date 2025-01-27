import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { product, ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


// {} [] *

@Component({
  selector: 'app-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit{
  productForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      discount: ['', [Validators.min(0), Validators.max(100)]],
      category: ['', Validators.required],
      manufactureDate: [''],
      stockStatus: ['', Validators.required],
      description: ['', [Validators.maxLength(200)]],
      image: [''],
    });
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.getProductById(this.data.id);
    }
  }

  getProductById(id: string): void {
    this.productService.getProductById(id).subscribe((product) => {
      this.productForm.patchValue(product); // Populate the form with existing product data
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct = this.productForm.value;

      this.productService.updateProduct(this.data.id, updatedProduct).subscribe({
        next: () => {
          this.snackbar.open('Product edited', 'Done',{duration: 3000})
          this.dialogRef.close(true);
          },
        error: (err) => {
          console.error('Error updating product:', err);
          this.snackbar.open('Failed to Product product', 'Okay', {duration: 3000})
        },
      });
    } else {
      this.snackbar.open('Please fill out all required fields', 'Okay', {duration: 3000});
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }

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

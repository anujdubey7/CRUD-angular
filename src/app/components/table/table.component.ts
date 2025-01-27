import { Component, OnInit, ViewChild, AfterViewInit, inject } from '@angular/core';
import { product, ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

// {} [] *

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'stockStatus', 'discount', 'manufactureDate', 'actions'];
  dataSource! :MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(){
    this.productService.getProductList().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onEdit(product: product){
    const dialogRef = this.dialog.open(DialogComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe((updatedProduct)=>{
      if (updatedProduct) {
        this.productService.getProductById(updatedProduct).subscribe({
          next: () => {
            this.snackBar.open('Product updated successfully!', 'Close', {
              duration: 3000,
            });
            this.loadProducts(); 
          }
        });
      }
    });
  }
  
  
  onDelete(id: string){
    this.productService.deleteProduct(id).subscribe({
      next: ()=>{
        this.snackBar.open('Product Deleted Succesfully', 'Close', {duration: 3000});
        this.loadProducts();
      },
      error: (err)=>{console.log(err)},
    })
  }
}




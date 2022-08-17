import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(){
    this.categoryService.getCategories()
    .subscribe( (data:any) => {

      console.log("Respuesta categories: ", data);
      this.processCategoriesResponse(data);
    }, (error:any) => {
      console.log("error: ", error);
    })
  }

  processCategoriesResponse(resp: any){

    const dataCategory: CategoryElement[] = [];

    if(resp.metadata[0].code == "00"){

      let listCategory = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }

  }
  openCategoryDialog(){
      const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria Agregada", "Exitosa");
        this.getCategories();
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al guardar categoria", "Error");
        this.getCategories();
      } 
    });
  }
  
  edit(id:number, name:string, description:string){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
      data: {id:id, name:name, description:description}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria actualizada", "Exitosa");
        this.getCategories();
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al actualizar categoria", "Error");
        this.getCategories();
      } 
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }
}

export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}
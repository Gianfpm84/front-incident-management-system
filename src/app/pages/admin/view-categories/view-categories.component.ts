import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories: any = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.listarCategorias().subscribe(
      (dato: any) => {
        this.categories = dato;
        console.log(this.categories);
      },

      (error) => {
        console.log(error);
        Swal.fire(
          '¡¡¡Error!!!',
          'Ha ocurrido un error al cargar las Categorias.',
          'error'
        );
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
})
export class AddCategoriesComponent implements OnInit {
  categories = {
    titulo: '',
    description: '',
  };

  constructor(
    private categoriesService: CategoriesService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addCategories() {
    if (this.categories.titulo.trim() == '' || this.categories.titulo == null) {
      this.snack.open('¡El Título es requerido!.', '', {
        duration: 3000,
      });
      return;
    }
    this.categoriesService.agregarCategorias(this.categories).subscribe(
      (dato: any) => {
        this.categories.titulo = '';
        this.categories.description = '';

        Swal.fire(
          'Categoria agregada de manera exitosa.',
          ' ¡Datos dados de alta!.',
          'success'
        );

        this.router.navigate(['/admin/categories']);
      },
      (error) => {
        console.log(error);
        Swal.fire(
          '¡¡¡Error!!!',
          'Ha ocurrido un error al guardar la Categría.',
          'error'
        );
      }
    );
  }
}

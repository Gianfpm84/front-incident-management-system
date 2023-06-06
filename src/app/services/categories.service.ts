import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  /**
   * Método de listar categorias.
   */

  public listarCategorias() {
    return this.http.get(`${baserUrl}/category/`);
  }

  /**
   * Método de listar categorias.
   */

  public agregarCategorias(category: any) {
    return this.http.post(`${baserUrl}/category/`, category);
  }
}

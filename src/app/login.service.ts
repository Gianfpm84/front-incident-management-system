import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './services/helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  public loginStatusSubjec = new Subject<boolean>();
  
  constructor(private http: HttpClient) { }

  /* Llama a un método del lado del servidor para Generar el token.*/

    public generateToken(loginData:any){

      return this.http.post(`${baserUrl}/generate-token`, loginData);

    }


    /*
     *  Método de incio de Sesión y establecer el token
     * en el LocalStorage. 
     */

    public loginUser(token:any){

      localStorage.setItem("token", token);

    }

     public iniciarSesion(){

      /* Permite declarar variables limitando su 
      alcance (scope) al bloque, permite que los 
      datos que manejas en los controladores pasen 
      a las vistas, y viceversa.
      */
      
      let tokenSr = localStorage.getItem("token");

      if(tokenSr == undefined || tokenSr == '' || tokenSr == null){

        return false;

      }else{

        return true;
      }
    }

      /* 
       *  Cerrar sesión y dar de baja el token
       * en el localStorage.
       */

      public cerrarSesion(){

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return true;

      }

      /*
       * Obtener el Token.
       */

      public getToken(){

        return localStorage.getItem('token');
      }


      /*
       * Estabecer un usuario.
       */

      public setUser(user:any){

                                   // Convierte un string a JSON.
       localStorage.setItem('user',JSON.stringify(user));

      }

      public getUser(){

        let userStr = localStorage.getItem('user');
        if(userStr != null){

          return JSON.parse(userStr);

        }else{

          this.cerrarSesion();
          return null;

        }
      }


      public getUserRole(){
        let user = this.getUser();
        return user.authorities[0].authority;
      }

      public getCurrentUser(){

        return this.http.get(`${baserUrl}/actual-usuario`);

      }

}

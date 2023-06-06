import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { Observable } from "rxjs";
import { LoginService } from "../login.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

constructor(private loginService : LoginService){

}
    /*
     *  Va a interceptar todas las solicitudes que existan entre cliente-servidor y viceversa,
     * intervienen las solicitudes de entrada y salida del, lo que llega del App al Servidor y
     * viceversa, en vez de usar los guards.
     */
    

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{

     let authReq = req;
    const token = this.loginService.getToken();

        if(token !=null){

            authReq = authReq.clone({

                /*
                 * Agrego una cabeera y modifico la peticion .
                 */

                setHeaders : {Authorization: `Bearer ${token}`}
            })
        }

        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
]

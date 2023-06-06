import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (this.loginData.username == '' || this.loginData.username == null) {
      this.snack.open('¡El nombre de usuario es requerido!.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    if (this.loginData.password == '' || this.loginData.password == null) {
      this.snack.open('¡La clave de usuario es requerido!.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);

        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          console.log(user);

          if (this.loginService.getUserRole() == 'ADMIN') {
            /*
             * Mostramos el escritorio del administrador.
             */

            //window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          } else if (this.loginService.getUserRole() == 'NORMAL') {
            /*
             * Mostramos el escritorio del usuario invitado.
             */
            //window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard']);

            this.loginService.loginStatusSubjec.next(true);
          } else {
            this.loginService.cerrarSesion();
          }
        });
      },
      (error) => {
        console.log(error);
        this.snack.open(
          'Datos erróneos, ¡favor intentar nuevamente!.',
          'Aceptar',
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
      }
    );
  }
}

import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  };

  public passwordConfirm!: String;

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('¡El nombre de usuario es requerido!.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('¡La contraseña de usuario es requerida!.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    if (this.passwordConfirm == '' || this.passwordConfirm == null) {
      this.snack.open(
        '¡La confirmación de la contraseña de usuario es requerida!.',
        'Aceptar',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }
      );

      return;
    }

    if (this.user.password != this.passwordConfirm) {
      this.snack.open(
        '¡La contraseña de usuario y su confirmación no coincide.',
        'Aceptar',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }
      );

      return;
    }

    if (this.user.nombre == '' || this.user.nombre == null) {
      this.snack.open('¡El nombre de usuario es requerido!.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    if (this.user.apellido == '' || this.user.apellido == null) {
      this.snack.open('¡El apellido de usuario es requerido!.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    if (this.user.email == '' || this.user.email == null) {
      this.snack.open('¡El email`s del usuario es requerido!.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    if (this.user.telefono == '' || this.user.telefono == null) {
      this.snack.open('¡El teléfono del usuario es requerido!.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);

        Swal.fire(
          '¡Usuario dado de Alta de forma exitosa!.',
          'Usuario registrado con éxito ne la base de datos.',
          'success'
        );
      },
      (error) => {
        console.log(error);
        this.snack.open(
          '¡Notificación importante!, ha ocurrido un error en el Sistema.',
          'Aceptar',
          {
            duration: 3000,
          }
        );
      }
    );
  }
}

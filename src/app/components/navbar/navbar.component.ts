import { Component, DoCheck } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { SignupComponent } from 'src/app/pages/signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements DoCheck {
  protected usuario!: string;

  constructor(public login: LoginService) {}

  ngDoCheck(): void {
    this.usuario = !!localStorage.getItem('token')
      ? 'Logged In'
      : 'Not Logged In';

    if (this.login.getUser() != null) {
      this.usuario = this.login.getUser().username;
    } else {
      this.usuario = 'Not Logged';
    }
  }

  public cerrarSesion() {
    this.login.cerrarSesion();
    window.location.reload();
  }
}

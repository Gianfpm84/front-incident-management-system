import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { InitComponent } from './init/init.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewRequestComponent } from './pages/admin/view-request/view-request.component';
import { AddRequestComponent } from './pages/admin/add-request/add-request.component';

const routes: Routes = [
  {
    path: '',
    component: InitComponent,
    pathMatch: 'full',
  },

  {
    path: 'init',
    component: InitComponent,
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },

  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },

  {
    path: 'admin',
    component: DashboardComponent,
    /*pathMatch: 'full',*/
    canActivate: [AdminGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },

      {
        /* Cuando es entre a cualquier ruta. */
        path: '',
        component: WelcomeComponent,
      },

      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },

      {
        path: 'add-categories',
        component: AddCategoriesComponent,
      },

      {
        path: 'request',
        component: ViewRequestComponent,
      },
      {
        path: 'add-request',
        component: AddRequestComponent,
      },
    ],
  },

  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

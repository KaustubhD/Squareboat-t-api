import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  // {path: '', component: HomeComponent},
  // {path: 'login', component: LoginComponent, canActivate: [NegateAuthGuard]},
  {path: 'register', component: RegisterComponent },
  // {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: ""},
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

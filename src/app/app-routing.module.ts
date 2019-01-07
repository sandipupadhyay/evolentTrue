import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {
    path: '',
    component: SignupComponent
 }
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes) ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
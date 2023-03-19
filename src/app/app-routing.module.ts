import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { StudentComponent } from './components/student/student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { StudentListComponent } from './components/student-list/student-list.component';

const routes: Routes = [
  { path: 'login', component: PagesLoginComponent },
  { path: 'student', component: StudentComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'add-student', component:AddStudentComponent},
  { path: 'edit-student', component:EditStudentComponent},
  { path: 'student-list', component:StudentListComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

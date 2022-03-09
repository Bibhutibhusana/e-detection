import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentUserComponent } from './department-user.component';

const routes: Routes = [
	{path:'',component: DepartmentUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentUserRoutingModule { }

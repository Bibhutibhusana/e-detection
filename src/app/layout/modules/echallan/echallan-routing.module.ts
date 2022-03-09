import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EchallanAddComponent } from './echallan-add/echallan-add.component';
import { EchallanListComponent } from './echallan-list/echallan-list.component';
import { IssuedEchallansComponent } from './issued-echallans/issued-echallans.component';


const routes: Routes = [
	{path:'',component:EchallanListComponent},
	{path:'echallan-add',component: EchallanAddComponent},
	{path:'issued-challan-list',component: IssuedEchallansComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EChallanRoutingModule { }

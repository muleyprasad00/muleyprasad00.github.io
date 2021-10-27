import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'page/dashboard', pathMatch: 'full' },
	{
		path: 'page/:name',
		loadChildren: () =>
			import('./page/page.module').then(m => m.PageModule),
	},
	{
		path: 'add-edit/:name/:id',
		loadChildren: () =>
			import('./add-edit-form/add-edit-form.module').then(m => m.AddEditFormModule),
	},
	{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

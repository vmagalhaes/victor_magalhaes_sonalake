import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListViewComponent } from './list-view/list-view.component';
import { FormCharacterComponent } from './form-character/form-character.component';

const routes: Routes = [
  {
    path: '',
    component: ListViewComponent
  },
  {
    path: 'character/add',
    component: FormCharacterComponent
  },
  {
    path: 'character/:id/edit',
    component: FormCharacterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

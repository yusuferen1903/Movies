import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'movies-list',
    component: MoviesListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

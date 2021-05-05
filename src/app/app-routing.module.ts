import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'compare',
    pathMatch: 'full',
  },
  {
    path: 'compare',
    loadChildren: () =>
      import('./compare/compare.module').then((module) => module.CompareModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

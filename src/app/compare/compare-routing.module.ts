import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompareComponent } from './compare.component';
import { CompareTableComponent } from './table/compare-table.component';
import { CompareChartComponent } from './chart/compare-chart.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: CompareComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'table',
        component: CompareTableComponent,
      },
      {
        path: 'chart',
        component: CompareChartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompareRoutingModule {}

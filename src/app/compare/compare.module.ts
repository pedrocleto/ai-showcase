import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareRoutingModule } from './compare-routing.module';
import { CompareComponent } from './compare.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from '@ag-grid-community/angular';
import { CompareTableComponent } from './table/compare-table.component';
import { CompareChartComponent } from './chart/compare-chart.component';
import { CompareService } from './services/compare.service';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatInputModule } from '@angular/material/input';
import { HighchartsChartModule } from 'highcharts-angular';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [
    CompareComponent,
    OverviewComponent,
    CompareTableComponent,
    CompareChartComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatTabsModule,
    MatInputModule,
    NgSelectModule,
    CompareRoutingModule,
    HighchartsChartModule,
    AgGridModule.withComponents(),
  ],
  providers: [CompareService],
})
export class CompareModule {}

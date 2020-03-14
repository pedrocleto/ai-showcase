import { Component } from '@angular/core';
import { AllCommunityModules, ColDef, ValueGetterParams, GridOptions, ColumnApi, GridApi } from '@ag-grid-community/all-modules';
import { finalize } from 'rxjs/operators';
import { CompareService } from '../services/compare.service';

@Component({
    selector: 'app-compare-table',
    templateUrl: './compare-table.component.html',
    styleUrls: ['./compare-table.component.scss'],
})
export class CompareTableComponent {
    modules = AllCommunityModules;
    columnDefs: ColDef[];
    rowData = [];
    gridOptions: GridOptions = {
        defaultColDef: {
            resizable: true,
            sortable: true,
            filter: true
        }
    };

    constructor(private compareService: CompareService) {
    }

    setColumns(columns: ColDef[]) {
        this.columnDefs = [];
        columns.forEach((column: ColDef) => {
            if (['memory', 'logic', 'planning'].indexOf(column.field) !== -1) {
                column.valueGetter = (valueGetterObject: ValueGetterParams) => {
                    if (valueGetterObject && valueGetterObject.data.hasOwnProperty('tasks')) {
                        const categoryFields = valueGetterObject.data.tasks.filter(filtered => filtered.category === column.field);
                        const categoryScores = categoryFields.map(fields => fields.score);
                        const totalAverage = categoryScores.reduce((total, value) => total + value, 0) / categoryScores.length;
                        return totalAverage;
                    }
                    return 0;

                };
            }
            this.columnDefs.push(column);
        });
    }

    hasGridOptions(gridOptions) {
        return gridOptions && gridOptions.api;
    }
    hideOverlay() {
        if (this.hasGridOptions(this.gridOptions)) {
            this.gridOptions.api.hideOverlay();
        }
    }

    onGridReady(params) {
        if (this.hasGridOptions(this.gridOptions)) {
            this.gridOptions.api.showLoadingOverlay();
        }
        this.compareService.getAllAgents()
            .pipe(finalize(() => this.hideOverlay()))
            .subscribe((data: any) => {
                this.setColumns([
                    { headerName: 'Name', field: 'name' },
                    { headerName: 'Description', field: 'description', tooltipField: 'description', minWidth: 550 },
                    { headerName: 'Memory', field: 'memory' },
                    {
                        headerName: 'Logic', field: 'logic'
                    }, {
                        headerName: 'Planning', field: 'planning'
                    }]);
                this.rowData = data;
            });
    }
}

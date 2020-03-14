import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { Agent } from '../../api';
import { calculateCategoryAverage, getCategoryName } from '../../share/helpers';
import { CompareService } from '../services/compare.service';

@Component({
    selector: 'app-compare-chart',
    templateUrl: './compare-chart.component.html',
    styleUrls: ['./compare-chart.component.scss']
})
export class CompareChartComponent implements AfterViewInit, OnDestroy {
    selectedAgents: Agent[];
    agents;
    chartTitle: string;

    @ViewChild('form', { static: false })
    form: NgForm;

    subscriptionOnFormEvent: Subscription;

    updateFromInput = false;
    chart;
    Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'category',
            title: {
                text: ''
            }
        },
        yAxis: {
            title: {
                text: 'Avg Scores'
            }
        },
        series: [

        ],
    };

    constructor(private compareService: CompareService) {
        this.agents = this.compareService.getAllAgents();

    }

    getChartInstance(chart) {
        this.chart = chart;
    }

    ngAfterViewInit() {
        this.subscribeFormChangeEvent();
    }

    subscribeFormChangeEvent() {
        if (this.form && !this.subscriptionOnFormEvent) {
            this.subscriptionOnFormEvent = this.form.statusChanges.pipe(
                filter(() => this.form ? this.form.valid : false),
                debounceTime(600))
                .subscribe(() => this.onFormValueChanged());
        }
    }

    onFormValueChanged() {
        if (this.form && this.form.valid) {
            this.buildChart();
        }
    }

    buildChart() {
        this.chartOptions.title = { text: this.chartTitle };
        const dataSet = [];
        this.selectedAgents.forEach((element: Agent) => {
            const dataObject = { id: element.id, name: element.name, chartData: [] };
            ['memory', 'logic', 'planning'].forEach(category => {
                const totalAverage = calculateCategoryAverage(element.tasks, category);
                dataObject.chartData.push([getCategoryName(category), totalAverage]);
            });
            dataSet.push(dataObject);
        });

        this.chartOptions.series = this.buildSeries(dataSet);

        this.updateFromInput = true;
    }

    buildSeries(dataSet) {
        const series = [];
        dataSet.forEach((dataElement) => {
            const seriesObject = { name: dataElement.name, data: dataElement.chartData, type: 'column' };
            series.push(seriesObject);
        });
        return series;
    }

    ngOnDestroy() {
        if (this.subscriptionOnFormEvent) {
            this.subscriptionOnFormEvent.unsubscribe();
        }
    }
}

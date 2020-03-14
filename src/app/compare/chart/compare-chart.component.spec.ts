import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import { of } from 'rxjs';
import { CompareService } from '../services/compare.service';
import { CompareChartComponent } from './compare-chart.component';

describe('CompareChartComponent', () => {
    let component: CompareChartComponent;
    let fixture: ComponentFixture<CompareChartComponent>;

    const mockCompareService = jasmine.createSpyObj('CompareService', ['getAllAgents',
        'searchAgentByName',
        'getAgentById'
    ]);
    mockCompareService.getAllAgents.and.returnValue(of([{
        id: 1,
        name: 'IMPALA',
        description: 'Scalable Distributed Deep-RL with Importance Weighted Actor-Learner Architectures',
        tasks: [
            { id: 'mem_1', name: 'Blackjack', category: 'memory', score: 56, },
            { id: 'mem_2', name: 'Q-bert', category: 'memory', score: 61, }, {
                id: 'logic_1',
                name: 'Breakout', category: 'logic', score: 79,
            },
            { id: 'logic_2', name: 'Tetris', category: 'logic', score: 21, },
            { id: 'logic_3', name: 'Basic Math', category: 'logic', score: 54, },
            { id: 'planning_1', name: 'Pacman', category: 'planning', score: 58, },],
    }, {
        id: 2,
        name: 'AlphaZero',
        description: 'Generalisation of AlphaGo Zero that can achieve, tabula rasa, superhuman performance in many challenging domains such as Chess, Shogi and Go.',
        tasks: [
            { id: 'mem_1', name: 'Blackjack', category: 'memory', score: 37 },
            { id: 'mem_2', name: 'Q-bert', category: 'memory', score: 29 },
            { id: 'logic_1', name: 'Breakout', category: 'logic', score: 7 },
            {
                id: 'logic_2', name: 'Tetris', category: 'logic', score: 92
            },
            { id: 'logic_3', name: 'Basic Math', category: 'logic', score: 88 },
            { id: 'planning_1', name: 'Pacman', category: 'planning', score: 100 }]
    }, {
        id: 3,
        name: 'R2D3',
        description: 'Making Efficient Use of Demonstrations to Solve Hard Exploration Problems.',
        tasks: [
            { id: 'mem_1', name: 'Blackjack', category: 'memory', score: 85 },
            { id: 'mem_2', name: 'Q-bert', category: 'memory', score: 73 },
            { id: 'logic_1', name: 'Breakout', category: 'logic', score: 28 },
            { id: 'logic_2', name: 'Tetris', category: 'logic', score: 26 },
            { id: 'logic_3', name: 'Basic Math', category: 'logic', score: 44 }, {
                id: 'planning_1', name: 'Pacman', category: 'planning', score: 72
            }]
    }]));
    mockCompareService.searchAgentByName.and.returnValue(of([]));
    mockCompareService.getAgentById.and.returnValue(of([]));
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HighchartsChartModule, MatTabsModule,
                BrowserAnimationsModule,
                MatInputModule,
                NgSelectModule,
            ],
            declarations: [CompareChartComponent],
            providers: [
                { provide: CompareService, useValue: mockCompareService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompareChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select agents', async(() => {
        fixture.debugElement.query(By.css('ng-select'))
            .triggerEventHandler('ngModelChange', [{
                id: 2,
                name: 'AlphaZero',
                description: 'Generalisation of AlphaGo Zero that can achieve, tabula rasa, superhuman performance in many challenging domains such as Chess, Shogi and Go.',
                tasks: [
                    { id: 'mem_1', name: 'Blackjack', category: 'memory', score: 37 },
                    { id: 'mem_2', name: 'Q-bert', category: 'memory', score: 29 },
                    { id: 'logic_1', name: 'Breakout', category: 'logic', score: 7 },
                    {
                        id: 'logic_2', name: 'Tetris', category: 'logic', score: 92
                    },
                    { id: 'logic_3', name: 'Basic Math', category: 'logic', score: 88 },
                    { id: 'planning_1', name: 'Pacman', category: 'planning', score: 100 }]
            }, {
                id: 3,
                name: 'R2D3',
                description: 'Making Efficient Use of Demonstrations to Solve Hard Exploration Problems.',
                tasks: [
                    { id: 'mem_1', name: 'Blackjack', category: 'memory', score: 85 },
                    { id: 'mem_2', name: 'Q-bert', category: 'memory', score: 73 },
                    { id: 'logic_1', name: 'Breakout', category: 'logic', score: 28 },
                    { id: 'logic_2', name: 'Tetris', category: 'logic', score: 26 },
                    { id: 'logic_3', name: 'Basic Math', category: 'logic', score: 44 }, {
                        id: 'planning_1', name: 'Pacman', category: 'planning', score: 72
                    }]
            }]);
        fixture.whenStable().then(() => {
            expect(component.selectedAgents.length).toBe(2);
        });
    }));

});

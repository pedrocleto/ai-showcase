import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { CompareComponent } from './compare.component';
import { CompareService } from './services/compare.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule } from '@angular/material/tabs';


describe('CompareComponent', () => {
    let component: CompareComponent;
    let fixture: ComponentFixture<CompareComponent>;

    const mockCompareService = jasmine.createSpyObj('CompareService', ['getAllAgents',
        'searchAgentByName',
        'getAgentById'
    ]);
    mockCompareService.getAllAgents.and.returnValue(of([]));
    mockCompareService.searchAgentByName.and.returnValue(of([]));
    mockCompareService.getAgentById.and.returnValue(of([]));
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MatTabsModule],
            declarations: [CompareComponent],
            providers: [
                { provide: CompareService, useValue: mockCompareService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompareComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});

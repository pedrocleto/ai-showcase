import { Component } from '@angular/core';
import { CompareService } from '../services/compare.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
    agents;
    selectedAgent;
    averageCategories;

    constructor(private compareService: CompareService) {
        this.compareService.getAllAgents().subscribe((data) => {
            this.agents = data;
            this.selectedAgent = data[0];
            this.selectionChanged();
        });

    }

    getCategoryName(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    selectionChanged() {
        this.averageCategories = [];
        if (this.selectedAgent) {
            ['memory', 'logic', 'planning'].forEach(category => {
                const categoryFields = this.selectedAgent.tasks.filter(filtered => filtered.category === category);
                const categoryScores = categoryFields.map(fields => fields.score);
                const totalAverage = categoryScores.reduce((total, value) => total + value, 0) / categoryScores.length;
                this.averageCategories.push({ label: this.getCategoryName(category), value: totalAverage });
            });
        }
    }
}

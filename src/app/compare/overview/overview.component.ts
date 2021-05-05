import { Component } from '@angular/core';
import { CompareService } from '../services/compare.service';
import { getCategoryName, calculateCategoryAverage } from '../../share/helpers';
import { Agent } from '../../api';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  agents: Agent[];
  selectedAgent: Agent;
  averageCategories;

  constructor(private compareService: CompareService) {
    this.compareService.getAllAgents().subscribe((data: Agent[]) => {
      this.agents = data;
      this.selectedAgent = data[0];
      this.selectionChanged();
    });
  }

  selectionChanged() {
    this.averageCategories = [];
    if (this.selectedAgent) {
      ['memory', 'logic', 'planning'].forEach((category) => {
        const totalAverage = calculateCategoryAverage(
          this.selectedAgent.tasks,
          category
        );
        this.averageCategories.push({
          label: getCategoryName(category),
          value: totalAverage,
        });
      });
    }
  }
}

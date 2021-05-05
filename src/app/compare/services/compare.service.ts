import { Injectable } from '@angular/core';
import { AgentsApi } from 'src/app/api';
import { from } from 'rxjs';

@Injectable()
export class CompareService {
  api;
  constructor() {
    this.api = new AgentsApi();
  }

  getAllAgents() {
    return from(this.api.listAgents());
  }

  searchAgentByName(name) {
    return from(this.api.searchAgents(name));
  }
  getAgentById(id) {
    return from(this.api.getAgent(id));
  }
}

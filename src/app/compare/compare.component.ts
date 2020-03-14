import { Component } from '@angular/core';

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss']
})
export class CompareComponent {
    navLinks = [
        { label: 'Overview', path: ['./overview'] },
        { label: 'Data Table', path: ['./table'] },
        { label: 'Chart', path: ['./chart'] }
    ];
    constructor() { }
}

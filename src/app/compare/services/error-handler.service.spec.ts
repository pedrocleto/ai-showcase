import { TestBed, inject } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ErrorHandlerService', () => {
    let mockMatSnackBar;
    let showedMessage = '';
    mockMatSnackBar = {
        open: (message) => showedMessage = message
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorHandlerService,
                { provide: MatSnackBar, useValue: mockMatSnackBar },

            ]
        });
    });

    it('should be created', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        expect(service).toBeTruthy();
    }));

    it('should reload page', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        const error = { message: 'Loading chunk 0 failed' };
        service.handleError(error);
        expect(showedMessage).toBe(error.message);
    }));
});

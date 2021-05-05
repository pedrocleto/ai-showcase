import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {
  constructor(private snackBar: MatSnackBar, private zone: NgZone) {
    super();
  }

  handleError(error: any): void {
    this.zone.run(() => {
      this.snackBar.open(error.message, 'Dismiss');
    });
  }
}

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button
      type="button"
      id="lookup"
      class="btn btn-outline-secondary btn-sm"
      (click)="onClick($event)"
    >
      {{ label }}
    </button>
  `
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params;
  label: string;
  label2: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
    this.label2 = this.params.label2 || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      };

      this.params.onClick(this.params);
    }
  }
}

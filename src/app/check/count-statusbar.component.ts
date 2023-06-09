import { Component } from '@angular/core';

import { IStatusPanelParams } from 'ag-grid-community';

@Component({
  selector: 'status-component',
  template: `
    <div
      class="ag-status-name-value"
      style="font-size: 16px; font-weight: bold;"
    >
      <span>總筆數：</span>
      <span
        class="ag-status-name-value-value"
        style="color: red; font-weight: bold;"
        >{{ count }}</span
      >
    </div>
  `
})
export class CountStatusBarComponent {
  private params: IStatusPanelParams;
  public count;

  agInit(params: IStatusPanelParams): void {
    this.params = params;

    this.params.api.addEventListener('gridReady', this.onGridReady.bind(this));
  }

  onGridReady() {
    this.count = this.params.api.getDisplayedRowCount();
  }
}

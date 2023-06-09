import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplyService } from '../../services/apply.service';

@Component({
  selector: 'app-data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.css']
})
export class DataPreviewComponent implements OnInit {
  @Input('data') rowData;
  @Output('submit') submitData: EventEmitter<any> = new EventEmitter();
  @Output('dataChange') rowDataChange: EventEmitter<any> = new EventEmitter();
  allowexport = false;
  _humanResource;

  constructor(private applyService: ApplyService) {}

  ngOnInit() {
    console.log(...this.rowData.humanResource);
    this._humanResource = { ...this.rowData.humanResource };
    console.log(this._humanResource);
  }

  save() {
    this.submitData.emit(1);
    alert('送出成功');
    this.allowexport = true;
  }

  export() {}
}

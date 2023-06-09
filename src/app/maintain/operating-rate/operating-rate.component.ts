import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject, takeUntil } from 'rxjs';
import { MaintainService } from '../../services/maintain.service';

@Component({
  selector: 'app-operating-rate',
  templateUrl: './operating-rate.component.html',
  styleUrls: ['./operating-rate.component.css']
})
export class OperatingRateComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('htmlData') htmlData: ElementRef;
  @Output('dataChange') rowDataChange: EventEmitter<any> = new EventEmitter();
  destory$: Subject<boolean> = new Subject<boolean>();

  private gridApi;
  private gridColumnApi;
  frameworkComponents: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private maintainService: MaintainService
  ) {
    this.maintainService.operatingrateDataList$
      .pipe(takeUntil(this.destory$))
      .subscribe({
        next: data => {
          this.rowData = [];
          this.rowData = [...data];
          console.log('on next', data);
        },
        complete: () => {}
      });
  }

  ngOnDestroy(): void {
    // console.log('on destory');
    this.destory$.next(true);
  }

  ngOnInit() {}

  columnDefs = [
    { field: '', checkboxSelection: true, width: 20 },
    {
      headerName: '年度',
      field: 'year',
      sortable: true,
      filter: true,
      editable: true,
      width: 100
    },
    {
      headerName: '費用名稱',
      field: 'itemname',
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['設備維護費率', '醫療作業費率', '教研及行政費率']
      }
    },
    {
      headerName: '費率(%)',
      field: 'rate',
      sortable: true,
      filter: true,
      editable: true
    }
  ];

  rowData = [];

  getRows() {
    let rowData = [];
    this.gridApi.forEachNode(node => {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
    return rowData;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var response = confirm('確定要刪除此筆資料嗎?');
    if (response === true) {
      this.gridApi.applyTransaction({ remove: selectedData });
    }
    this.rowDataChange.emit(this.getRows());
  }

  addItems() {
    var newItems = [this.maintainService.newORData()];
    this.gridApi.applyTransaction({
      add: newItems
    });
    this.rowDataChange.emit(this.getRows());
    //return newItems;
  }

  submitData($event) {
    console.log('Fish test:', this.getRows());
    this.maintainService.updateORData(this.getRows());
  }
}

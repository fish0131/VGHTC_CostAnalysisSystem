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
  selector: 'app-worker-hours',
  templateUrl: './worker-hours.component.html',
  styleUrls: ['./worker-hours.component.css']
})
export class WorkerHoursComponent implements OnInit {
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
    this.maintainService.workerhoursDataList$
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
      headerName: '工作天數',
      field: 'workday',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '全年工作小時',
      field: 'workhours',
      sortable: true,
      filter: true
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

  onCellValueChanged(params) {
    params.data.workhours = params.data.workday * 8;
    params.api.applyTransaction({ update: [params.data] });
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
    var newItems = [this.maintainService.newWHData()];
    this.gridApi.applyTransaction({
      add: newItems
    });
    this.rowDataChange.emit(this.getRows());
    //return newItems;
  }

  submitData($event) {
    console.log('Fish test:', this.getRows());
    this.maintainService.updateWHData(this.getRows());
  }
}

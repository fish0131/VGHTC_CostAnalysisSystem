import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject, takeUntil } from 'rxjs';
import { ButtonRendererComponent } from '../../button-renderer.component';
import { MaintainService } from '../../services/maintain.service';

@Component({
  selector: 'app-human-resource',
  templateUrl: './human-resource.component.html',
  styleUrls: ['./human-resource.component.css']
})
export class HumanResourceComponent implements OnInit {
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
    this.maintainService.humanresourceDataList$
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
      width: 100,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['107', '108', '109', '110'] }
    },
    {
      headerName: '部科單位',
      field: 'department',
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [
          '內科部過敏免疫風濕科',
          '麻醉部',
          '病理檢驗部',
          '藥學部',
          '家庭醫學部',
          '復健部',
          '影像醫學部'
        ]
      }
    },
    {
      headerName: '人員別',
      field: 'job',
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [
          '主治醫師',
          '住院醫師',
          '護理人員',
          '醫事人員(醫檢)',
          '醫事人員(藥師)',
          '放射醫師'
        ]
      }
    },
    {
      headerName: '薪項',
      field: 'item',
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['全部', '固定', '變動'] },
      cellStyle: params => {
        if (params.value === '固定') {
          return { color: 'darkgreen' };
        } else if (params.value === '變動') {
          return { color: 'red' };
        } else {
          return { color: 'darkblue' };
        }
      }
    },
    {
      headerName: '平均年薪',
      field: 'salary',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '全年工時',
      field: 'hr',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '每分鐘成本',
      field: 'cost',
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
    params.data.cost =
      Math.round(
        (params.data.salary / (params.data.hr * 60) + Number.EPSILON) * 100
      ) / 100;
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
    var newItems = [this.maintainService.newHRData()];
    this.gridApi.applyTransaction({
      add: newItems
    });
    this.rowDataChange.emit(this.getRows());
    //return newItems;
  }

  submitData($event) {
    console.log('Fish test:', this.getRows());
    this.maintainService.updateHRData(this.getRows());
  }
}

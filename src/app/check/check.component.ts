import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject, takeUntil } from 'rxjs';
import { ButtonRendererComponent } from '../button-renderer.component';
import { ApplyService } from '../services/apply.service';
import { CountStatusBarComponent } from './count-statusbar.component';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('htmlData') htmlData: ElementRef;
  destory$: Subject<boolean> = new Subject<boolean>();
  frameworkComponents: any;

  private gridApi;
  private gridColumnApi;
  public statusBar;
  _applyData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applyService: ApplyService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      countStatusBarComponent: CountStatusBarComponent
    };
    this.statusBar = {
      statusPanels: [{ statusPanel: 'countStatusBarComponent' }]
    };
    this.applyService.applyDataList$.pipe(takeUntil(this.destory$)).subscribe({
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

  ngOnInit() {
    this.route.params.subscribe({
      next: param => {
        if (param['applyID'] != null) {
          // console.log(param['applyID']);
          // Object.assign(this._applyData, this.applyService.getData(param['applyID']));
          const data: any = { ...this.applyService.getData(param['applyID']) };
          console.log(data);
          //Object.assign(this._applyData, data);
          this._applyData = { ...data };
        }
      }
    });
  }

  columnDefs = [
    {
      field: '',
      checkboxSelection: true,
      width: 20
    },
    {
      field: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onCheckButtonClick.bind(this),
        label: '查看'
      },
      width: 65
    },
    {
      field: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onEditButtonClick.bind(this),
        label: '修改'
      },
      width: 120
    },
    {
      headerName: '部科單位',
      field: 'department',
      sortable: true,
      filter: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [
          '神經外科',
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
      headerName: '醫療項目',
      field: 'medical_item',
      sortable: true,
      filter: true,
      width: 500
    },
    {
      headerName: '送審日期',
      field: 'date',
      sortable: true,
      filter: true
    },
    {
      headerName: '狀態',
      field: 'state',
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['尚未審核', '審核通過', '退件'] },
      cellStyle: params => {
        if (params.value === '尚未審核') {
          return { color: 'blue' };
        } else if (params.value === '審核通過') {
          return { color: 'darkgreen' };
        } else {
          return { color: 'red' };
        }
      }
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

  onCheckButtonClick(params) {
    console.log(params);
  }

  onEditButtonClick(params) {
    console.log(params);
    this.router.navigateByUrl(`apply_edit/${params.data.applyID}`);
  }

  toSave() {
    this.applyService.updateData(this._applyData);
  }
}

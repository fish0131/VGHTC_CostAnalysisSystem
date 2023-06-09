import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { UploadComponent } from '../upload.component';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-apply-device-fix',
  templateUrl: './apply-device-fix.component.html',
  styleUrls: ['./apply-device-fix.component.css']
})
export class ApplyDeviceFixComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGrid2') agGrid2: AgGridAngular;
  @ViewChild('htmlData') htmlData: ElementRef;

  @Input('data') rowData;
  @Input('data2') rowData2;
  @Output('dataChange') rowDataChange: EventEmitter<any> = new EventEmitter();
  @Output('data2Change') rowData2Change: EventEmitter<any> = new EventEmitter();

  private gridApi;
  private gridColumnApi;
  frameworkComponents: any;

  constructor() {
    this.frameworkComponents = {
      upload: UploadComponent
    };
  }

  columnDefs = [
    { headerName: '選取', field: '', checkboxSelection: true, width: 20 },

    {
      headerName: '設備名稱',
      field: 'equipment_fix',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '財產碼(流水號)',
      field: 'equipment_fix_no',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '報價單',
      field: 'upload',
      cellRenderer: 'upload',
      cellRendererParams: {
        onClick: this.upload.bind(this),
        label: '上傳'
      },
      width: 300
    },

    {
      headerName: '維護成本',
      field: 'equipment_fix_cost',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '每分鐘維護金額',
      field: 'equipment_fix_cost_min',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '前置期(分鐘)',
      field: 'equ_fix_stage1',
      sortable: true,
      filter: true,
      editable: true
    },

    {
      headerName: '初期(分鐘)',
      field: 'equ_fix_stage2',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '中期(分鐘)',
      field: 'equ_fix_stage3',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '後期(分鐘)',
      field: 'equ_fix_stage4',
      sortable: true,
      filter: true,
      editable: true
    },

    {
      headerName: '耗用時間(分鐘)',
      field: 'equ_fix_total_min',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '成本小計(元)',
      field: 'equ_fix_partial_cost',
      sortable: true,
      filter: true,
      editable: false,
      aggFunc: 'mySum',
      valueParser: 'Number(newValue)'
    }
  ];

  columnDefs2 = [
    { headerName: '選取', field: '', checkboxSelection: true, width: 20 },
    {
      headerName: '名稱',
      field: 'equipment_fix_name',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '計算方式',
      field: 'equipment_fix_intro',
      sortable: true,
      filter: true,
      width: 500,
      editable: true
    },
    {
      headerName: '成本小計(元)',
      field: 'equ_fix_partial_cost2',
      sortable: true,
      filter: true,
      editable: true,
      aggFunc: 'mySum',
      valueParser: 'Number(newValue)'
    }
  ];

  aggFuncs = {
    // this overrides the grids built-in sum function
    mySum: params => {
      let sum = 0;
      params.values.forEach(value => (sum += value));
      return '成本合計： ' + sum.toFixed(2);
    }
  };

  gridOptions = {
    getRowStyle: params => {
      if (params.node.footer) {
        return { fontWeight: 'bold', background: 'lightgrey' };
      }
    }
  };

  ngOnInit() {}

  getTopRows() {
    let rowData = [];
    this.agGrid.api.forEachNode(node => {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
    return rowData;
  }

  getBottomRows() {
    let rowData2 = [];
    this.agGrid2.api.forEachNode(node => {
      rowData2.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData2);
    return rowData2;
  }

  onCellValueChanged(params) {
    params.data.equ_fix_total_min =
      Number(params.data.equ_fix_stage1) +
      Number(params.data.equ_fix_stage2) +
      Number(params.data.equ_fix_stage3) +
      Number(params.data.equ_fix_stage4);
    params.data.equ_fix_partial_cost =
      Math.round(
        (params.data.equipment_fix_cost_min * params.data.equ_fix_total_min +
          Number.EPSILON) *
          100
      ) / 100;
    console.log(
      params.data.equ_fix_total_min,
      params.data.equ_fix_partial_cost
    );
    this.agGrid.api.applyTransaction({ update: [params.data] });
  }

  onDeleteButtonClick() {
    var selectedData = this.agGrid.api.getSelectedRows();
    var selectedData2 = this.agGrid2.api.getSelectedRows();
    var response = confirm('確定要刪除此筆資料嗎?');
    if (response === true) {
      var res = this.agGrid.api.applyTransaction({ remove: selectedData });
      var res2 = this.agGrid2.api.applyTransaction({ remove: selectedData2 });
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  addRow() {
    this.agGrid.api.applyTransaction({
      add: [
        {
          equipment_fix: '',
          equipment_fix_no: '',
          equipment_fix_cost: 0,
          equipment_fix_cost_min: 0,
          equ_fix_stage1: 0,
          equ_fix_stage2: 0,
          equ_fix_stage3: 0,
          equ_fix_stage4: 0,
          equ_fix_total_min: 0,
          equ_fix_partial_cost: 0
        }
      ],
      addIndex: 0
    });
    this.rowDataChange.emit(this.getTopRows());
  }
  addRow2() {
    this.agGrid2.api.applyTransaction({
      add: [
        {
          equipment_fix_name: '',
          equipment_fix_intro: '',
          equ_fix_partial_cost2: 0
        }
      ],
      addIndex: 0
    });
    this.rowData2Change.emit(this.getBottomRows());
  }
  onAddButtonClick() {
    var element = <HTMLInputElement>document.getElementById('topcb');
    var isChecked = element.checked;
    var element2 = <HTMLInputElement>document.getElementById('bottomcb');
    var isChecked2 = element2.checked;

    if (isChecked == true && isChecked2 == false) {
      this.addRow();
    } else if (isChecked == false && isChecked2 == true) {
      this.addRow2();
    } else if (isChecked == true && isChecked2 == true) {
      this.addRow();
      this.addRow2();
    }
  }

  upload(files: File[]) {
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  uploadAndProgress(files: File[]) {
    console.log(files);
  }
}

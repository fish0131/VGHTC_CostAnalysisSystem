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
import 'ag-grid-enterprise';

@Component({
  selector: 'app-apply-medicine-priced',
  templateUrl: './apply-medicine-priced.component.html',
  styleUrls: ['./apply-medicine-priced.component.css']
})
export class ApplyMedicinePricedComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('htmlData') htmlData: ElementRef;

  @Input('data') rowData;
  @Output('dataChange') rowDataChange: EventEmitter<any> = new EventEmitter();

  private gridApi;
  private gridColumnApi;
  frameworkComponents: any;

  constructor() {}

  ngOnInit() {}

  columnDefs = [
    { headerName: '選取', field: '', checkboxSelection: true, width: 20 },

    {
      headerName: '計價品名',
      field: 'priced_kit',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '物料碼/藥碼',
      field: 'priced_kit_no',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '單位',
      field: 'priced_kit_unit',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '單位成本',
      field: 'priced_kit_unit_cost',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '前置期(數量)',
      field: 'priced_kit_stage1',
      sortable: true,
      filter: true,
      editable: true
    },

    {
      headerName: '初期(數量)',
      field: 'priced_kit_stage2',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '中期(數量)',
      field: 'priced_kit_stage3',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '後期(數量)',
      field: 'priced_kit_stage4',
      sortable: true,
      filter: true,
      editable: true
    },

    {
      headerName: '消耗數量',
      field: 'priced_kit_total_num',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '成本小計(元)',
      field: 'priced_kit_partial_cost',
      sortable: true,
      filter: true,
      editable: false,
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

  getRows() {
    let rowData = [];
    this.gridApi.forEachNode(node => {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
    return rowData;
  }

  onCellValueChanged(params) {
    params.data.priced_kit_total_num =
      Number(params.data.priced_kit_stage1) +
      Number(params.data.priced_kit_stage2) +
      Number(params.data.priced_kit_stage3) +
      Number(params.data.priced_kit_stage4);

    params.data.priced_kit_partial_cost =
      Math.round(
        (params.data.priced_kit_unit_cost * params.data.priced_kit_total_num +
          Number.EPSILON) *
          100
      ) / 100;
    this.gridApi.applyTransaction({ update: [params.data] });
  }

  onDeleteButtonClick() {
    var selectedData = this.gridApi.getSelectedRows();
    var response = confirm('確定要刪除此筆資料嗎?');
    if (response === true) {
      var res = this.gridApi.applyTransaction({ remove: selectedData });
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onAddButtonClick() {
    this.agGrid.api.applyTransaction({
      add: [
        {
          priced_kit: '',
          priced_kit_no: '',
          priced_kit_unit: '',
          priced_kit_unit_cost: 0,
          priced_kit_stage1: 0,
          priced_kit_stage2: 0,
          priced_kit_stage3: 0,
          priced_kit_stage4: 0,
          priced_kit_total_num: 0,
          priced_kit_partial_cost: 0
        }
      ],
      addIndex: 0
    });

    this.rowDataChange.emit(this.getRows());
  }
}

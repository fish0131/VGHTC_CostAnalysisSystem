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
  selector: 'app-apply-human-resource',
  templateUrl: './apply-human-resource.component.html',
  styleUrls: ['./apply-human-resource.component.css']
})
export class ApplyHumanResourceComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('htmlData') htmlData: ElementRef;

  @Input('data') rowData;
  @Output('dataChange') rowDataChange: EventEmitter<any> = new EventEmitter();

  private gridApi;
  private gridColumnApi;
  frameworkComponents: any;

  constructor() {}

  columnDefs = [
    { headerName: '選取', field: '', checkboxSelection: true, width: 20 },

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
          '影像醫學部',
          '護理部手術室'
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
      headerName: '人數',
      field: 'numbers',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '每分鐘成本',
      field: 'cost_min',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '前置期(分鐘)',
      field: 'stage1',
      sortable: true,
      filter: true,
      editable: true
    },

    {
      headerName: '初期(分鐘)',
      field: 'stage2',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '中期(分鐘)',
      field: 'stage3',
      sortable: true,
      filter: true,
      editable: true
    },
    {
      headerName: '後期(分鐘)',
      field: 'stage4',
      sortable: true,
      filter: true,
      editable: true
    },

    {
      headerName: '耗用時間(分鐘)',
      field: 'total_min',
      sortable: true,
      filter: true,
      editable: false
    },

    {
      headerName: '成本小計(元)',
      field: 'partial_cost',
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

  ngOnInit() {}

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
    params.data.total_min =
      Number(params.data.stage1) +
      Number(params.data.stage2) +
      Number(params.data.stage3) +
      Number(params.data.stage4);
    params.data.partial_cost =
      params.data.cost_min * params.data.total_min * params.data.numbers;
    console.log(params.data.total_min, params.data.partial_cost);
    params.api.applyTransaction({ update: [params.data] });
  }

  // onSaveButtonClick() {
  //   this.agGrid.api.stopEditing(false);
  //   alert('此筆資料儲存成功');
  //   let selectedData = this.agGrid.api.getSelectedRows();
  //   for (var index = 0; index < selectedData.length; index++) {
  //     selectedData[index].total_min =
  //       Number(selectedData[index].stage1) +
  //       Number(selectedData[index].stage2) +
  //       Number(selectedData[index].stage3) +
  //       Number(selectedData[index].stage4);
  //     selectedData[index].partial_cost =
  //       selectedData[index].cost_min *
  //       selectedData[index].total_min *
  //       selectedData[index].numbers;
  //     this.agGrid.api.applyTransaction({ update: [selectedData[index]] });
  //   }
  // }

  onDeleteButtonClick() {
    var selectedData = this.agGrid.api.getSelectedRows();
    var response = confirm('確定要刪除此筆資料嗎?');
    if (response == true) {
      var res = this.agGrid.api.applyTransaction({ remove: selectedData });
      this.rowDataChange.emit(this.getRows());
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // console.log(this.agGrid.api.getDisplayedRowCount());
  }

  onAddButtonClick() {
    const transaction = this.agGrid.api.applyTransaction({
      add: [
        {
          department: '',
          job: '',
          numbers: 0,
          cost_min: 0,
          stage1: 0,
          stage2: 0,
          stage3: 0,
          stage4: 0,
          total_min: 0,
          partial_cost: 0
        }
      ],
      addIndex: 0
    });

    this.rowDataChange.emit(this.getRows());
    // console.log(this.rowData)
  }
}

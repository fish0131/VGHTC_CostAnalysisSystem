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
  selector: 'app-apply-convert',
  templateUrl: './apply-convert.component.html',
  styleUrls: ['./apply-convert.component.css']
})
export class ApplyConvertComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('htmlData') htmlData: ElementRef;

  @Input('data') rowData;
  @Output('dataChange') rowDataChange: EventEmitter<any> = new EventEmitter<
    any
  >();

  private gridApi;
  private gridColumnApi;
  frameworkComponents: any;

  constructor() {}

  ngOnInit() {}

  columnDefs = [
    { headerName: '選取', field: '', checkboxSelection: true, width: 20 },

    {
      headerName: '名稱',
      field: 'exam',
      sortable: true,
      filter: true,
      editable: true
    },

    {
      headerName: '計算方式說明',
      field: 'exam_intro',
      sortable: true,
      filter: true,
      editable: true,
      width: 500
    },

    {
      headerName: '成本小計(元)',
      field: 'exam_partial_cost',
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

  getRows() {
    let rowData = [];
    this.gridApi.forEachNode(node => {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
    return rowData;
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
  }

  onAddButtonClick() {
    this.agGrid.api.applyTransaction({
      add: [
        {
          exam: '',
          exam_intro: '',
          exam_partial_cost: 0
        }
      ],
      addIndex: 0
    });

    this.rowDataChange.emit(this.getRows());
  }
}

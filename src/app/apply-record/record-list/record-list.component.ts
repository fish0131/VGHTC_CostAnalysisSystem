import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject, takeUntil } from 'rxjs';
import { ButtonRendererComponent } from '../../button-renderer.component';
import { ApplyService } from '../../services/apply.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('htmlData') htmlData: ElementRef;
  destory$: Subject<boolean> = new Subject<boolean>();
  frameworkComponents: any;
  user_department = this.authService.userInfo.department;
  identity = this.authService.userInfo.identity;
  private gridApi;
  private gridColumnApi;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private applyService: ApplyService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    };

    this.applyService.applyDataList$.pipe(takeUntil(this.destory$)).subscribe({
      next: data => {
        this.rowData = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].department === this.user_department && this.identity === 'user') {
            this.rowData.push(data[i]);
            console.log('on next', data[i]);
          }
          else if (this.identity === 'manager') {
            this.rowData.push(data[i]);
          }
        }
      },
      complete: () => {}
    });
  }

  ngOnDestroy(): void {
    // console.log('on destory');
    this.destory$.next(true);
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
      filter: true
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
      //editable: true,
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

  applyList;
  rowData = [];

  ngOnInit() {}

  toAdd() {
    this.router.navigate(['/apply_edit/new'], { relativeTo: this.route });
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
}

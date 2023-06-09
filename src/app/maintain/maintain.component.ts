import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintainService } from '../services/maintain.service';

@Component({
  selector: 'app-maintain',
  templateUrl: './maintain.component.html',
  styleUrls: ['./maintain.component.css']
})
export class MaintainComponent implements OnInit {
  _HRData;

  constructor(
    private maintainservice: MaintainService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe({
      next: param => {
        if (param['humanresourceID'] != null) {
          // console.log(param['applyID']);
          // Object.assign(this._applyData, this.applyService.getData(param['applyID']));
          const data: any = {
            ...this.maintainservice.getHRData(param['humanresourceID'])
          };
          console.log(data);
          //Object.assign(this._applyData, data);
          this._HRData = { ...data };
        }
      }
    });
  }
}

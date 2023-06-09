import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyService } from '../services/apply.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  _applyData;
  department = this.authService.userInfo.department;
  name = this.authService.userInfo.name;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private applyService: ApplyService
  ) {}

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
          console.log(this._applyData);
        }
      }
    });
  }

  goBack(rejectChange = false) {
    console.log(this._applyData);
    if (rejectChange) {
      this.applyService.updateData(undefined);
    }
    this.router.navigate(['/apply_record'], { relativeTo: this.route });
  }

  submitData($event) {
    console.log(this._applyData);
    this._applyData.date = new Date().toDateString();
    this.applyService.updateData(this._applyData);
    //this.goBack();
  }
}

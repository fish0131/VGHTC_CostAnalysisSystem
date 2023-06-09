import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-apply-record',
  templateUrl: './apply-record.component.html',
  styleUrls: ['./apply-record.component.css']
})
export class ApplyRecordComponent implements OnInit {
  name = this.authService.userInfo.name;
  manager = false;
  identity = this.authService.userInfo.identity;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.identity == 'manager') {
      this.manager = true;
    }
  }

  goBack() {
    this.router.navigate(['/menu'], { relativeTo: this.route });
  }

  toLogout() {
    this.authService.logout();
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}

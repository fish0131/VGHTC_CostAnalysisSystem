import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyService } from '../../services/apply.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-apply-header',
  templateUrl: './apply-header.component.html',
  styleUrls: ['./apply-header.component.css']
})
export class ApplyHeaderComponent implements OnInit {
  identity = this.authService.userInfo.identity;
  name = this.authService.userInfo.name;
  today = new Date();

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private applyService: ApplyService
  ) {}

  ngOnInit() {}

  toLogout() {
    this.authService.logout();
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  goBack() {
    this.router.navigate(['/apply_record'], { relativeTo: this.route });
  }
}

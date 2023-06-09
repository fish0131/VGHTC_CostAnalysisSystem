import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-manager-header',
  templateUrl: './manager-header.component.html',
  styleUrls: ['./manager-header.component.css']
})
export class ManagerHeaderComponent implements OnInit {
  name = this.authService.userInfo.name;
  today = new Date();

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/menu'], { relativeTo: this.route });
  }

  toLogout() {
    this.authService.logout();
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.css']
})
export class ManagerMenuComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  toApply() {
    this.router.navigate(['apply_record']);
  }

  toMaintain() {
    this.router.navigate(['maintain']);
  }

  toCheck() {
    this.router.navigate(['check']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}

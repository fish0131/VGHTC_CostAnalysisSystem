import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = '單項成本分析系統';
  user: any = {};
  loginForm: FormGroup; // <--- 宣告loginForm為FormGroup
  error = 'Account or password is incorrect';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
    // <--- 注入FormBuilder
    //this.createForm();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      account: ['', Validators.required], // <--- 建立一個名為account，預設值為''的formControl
      password: ['', Validators.required]
    });
  }

  onSubmit(form) {
    if (this.loginForm.invalid) {
      this.router.navigate(['/']);
    } else {
      this.authService.login(
        form.controls.account.value,
        form.controls.password.value
      );
      //console.log(this.authService.loggedIn);
      if (this.authService.userInfo.identity == 'manager') {
        this.loading = false;
        this.router.navigate(['/menu'], { relativeTo: this.route });
      } else if (this.authService.userInfo.identity == 'user') {
        this.loading = false;
        this.router.navigate(['/apply_record'], { relativeTo: this.route });
      } else {
        this.loading = true;
      }
    }
  }
}

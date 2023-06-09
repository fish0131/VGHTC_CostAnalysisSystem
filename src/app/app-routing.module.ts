import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyRecordComponent } from './apply-record/apply-record.component';
import { ApplyComponent } from './apply/apply.component';
import { CheckComponent } from './check/check.component';
import { LoginComponent } from './login/login.component';
import { MaintainComponent } from './maintain/maintain.component';
import { ManagerMenuComponent } from './manager-menu/manager-menu.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }, // [url]/login
  { path: 'apply_record', component: ApplyRecordComponent }, // [url]/apply_record canActivate: [AuthGuard]
  { path: 'apply_edit/:applyID', component: ApplyComponent }, // [url]/apply
  { path: 'menu', component: ManagerMenuComponent }, // [url]/menu
  { path: 'maintain', component: MaintainComponent }, // [url]/maintain
  { path: 'check', component: CheckComponent } // [url]/check
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes) // import router module and define routes
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

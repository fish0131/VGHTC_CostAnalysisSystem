import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';
import { ApplyService } from './services/apply.service';
import { MaintainService } from './services/maintain.service';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { ApplyRecordComponent } from './apply-record/apply-record.component';
import { ButtonRendererComponent } from './button-renderer.component';
import { RecordListComponent } from './apply-record/record-list/record-list.component';
import { ApplyHeaderComponent } from './apply/apply-header/apply-header.component';
import { ApplyComponent } from './apply/apply.component';
import { ApplyHumanResourceComponent } from './apply/apply-human-resource/apply-human-resource.component';
import { ApplyDeviceOldComponent } from './apply/apply-device-old/apply-device-old.component';
import { ApplyDeviceFixComponent } from './apply/apply-device-fix/apply-device-fix.component';
import { ApplyConvertComponent } from './apply/apply-convert/apply-convert.component';
import { ApplyMedicinePricedComponent } from './apply/apply-medicine-priced/apply-medicine-priced.component';
import { ApplyMedicineNotpricedComponent } from './apply/apply-medicine-notpriced/apply-medicine-notpriced.component';
import { DataPreviewComponent } from './apply/data-preview/data-preview.component';
import { ManagerMenuComponent } from './manager-menu/manager-menu.component';
import { ManagerHeaderComponent } from './manager-header/manager-header.component';
import { MaintainComponent } from './maintain/maintain.component';
import { HumanResourceComponent } from './maintain/human-resource/human-resource.component';
import { WorkerHoursComponent } from './maintain/worker-hours/worker-hours.component';
import { OperatingRateComponent } from './maintain/operating-rate/operating-rate.component';
import { CheckComponent } from './check/check.component';
import { CountStatusBarComponent } from './check/count-statusbar.component';
import { FormatDateTimePipe } from './pipes/format-datetime.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    NgbModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    LoginComponent,
    ApplyRecordComponent,
    RecordListComponent,
    ApplyComponent,
    ApplyHeaderComponent,
    ButtonRendererComponent,
    ApplyHumanResourceComponent,
    ApplyDeviceOldComponent,
    ApplyDeviceFixComponent,
    ApplyConvertComponent,
    ApplyMedicinePricedComponent,
    ApplyMedicineNotpricedComponent,
    DataPreviewComponent,
    ManagerMenuComponent,
    ManagerHeaderComponent,
    MaintainComponent,
    HumanResourceComponent,
    WorkerHoursComponent,
    OperatingRateComponent,
    CheckComponent,
    CountStatusBarComponent,
    FormatDateTimePipe
  ],
  bootstrap: [AppComponent],
  providers: [AuthService, ApplyService, MaintainService]
})
export class AppModule {}

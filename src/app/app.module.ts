import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportPageComponent } from './components/report-page/report-page.component';
import { SubmitReportComponent } from './components/submit-report/submit-report.component';
import { InputComponentComponent } from './components/input-component/input-component.component';
import { ManageUserReportsComponent } from './pages/manage-user-reports/manage-user-reports.component';
import { HttpClientModule } from '@angular/common/http';
import { FormInputComponent } from './components/form-input/form-input.component';
import { InputFormCloneComponent } from './components/input-form-clone/input-form-clone.component';
import { InputFormEditComponent } from './components/input-form-edit/input-form-edit.component';
import { PenaltyReportComponent } from './components/penalty-report/penalty-report.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InputAddnewReportComponentComponent } from './components/input-addnew-report-component/input-addnew-report-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportPageComponent,
    SubmitReportComponent,
    InputComponentComponent,
    ManageUserReportsComponent,
    FormInputComponent,
    InputFormCloneComponent,
    InputFormEditComponent,
    PenaltyReportComponent,
    InputAddnewReportComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

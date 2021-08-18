import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormCloneComponent } from './components/input-form-clone/input-form-clone.component';
import { InputFormEditComponent } from './components/input-form-edit/input-form-edit.component';
import { PenaltyReportComponent } from './components/penalty-report/penalty-report.component';
import { ReportPageComponent } from './components/report-page/report-page.component';
import { SubmitReportComponent } from './components/submit-report/submit-report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportPageComponent,
  },
  {
    path: 'reports',
    component: ReportPageComponent,
  },
  {
    path: 'submit-report/:id',
    component: InputFormCloneComponent,
  },
  {
    path: 'edit-report/:id',
    component: InputFormEditComponent,
  },
  {
    path: 'submit-report',
    component: SubmitReportComponent,
  },
  {
    path: 'penalty-report',
    component: PenaltyReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

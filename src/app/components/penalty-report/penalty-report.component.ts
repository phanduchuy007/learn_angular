import { Component, OnInit } from '@angular/core';
import { ServiceAppService } from 'src/app/services/service-app.service';
import { IObjectKeysInput } from 'src/app/interfaces/Reports';

@Component({
  selector: 'app-penalty-report',
  templateUrl: './penalty-report.component.html',
  styleUrls: ['./penalty-report.component.scss'],
})
export class PenaltyReportComponent implements OnInit {
  constructor(private service: ServiceAppService) {}

  dataPenaltyReports: Array<IObjectKeysInput> = [];

  ngOnInit(): void {
    this.getPenaltyReportByUserID();
  }

  getPenaltyReportByUserID() {
    this.service.getPenaltyReportByUserID(9).subscribe((data) => {
      this.dataPenaltyReports = data;
      console.log(data);
    });
  }
}

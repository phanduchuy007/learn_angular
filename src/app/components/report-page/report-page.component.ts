import { Component, OnInit } from '@angular/core';
import { ServiceAppService } from 'src/app/services/service-app.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { report } from 'src/app/interfaces/Reports';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
})
export class ReportPageComponent implements OnInit {
  dataReports!: Array<any>;

  dataSearch: Array<any> = [];

  checkDataSearch: boolean = true;

  p: number = 1;

  totalItems: number = 0;

  sortBy: string = 'createAt';

  typeSort: string = 'desc';

  expression: boolean = true;

  constructor(
    private service: ServiceAppService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDataReport();
    this.getDataPagination();
  }

  getDataReport() {
    this.service.getDataReport(9).subscribe((data) => {
      this.totalItems = data.length;
    });
  }

  addClick() {
    this.router.navigate(['/submit-report']);
  }

  checkClick(id: number) {
    console.log(id);
    this.router.navigate(['/submit-report', id]);
  }

  redirectToEditForm(id: number) {
    this.router.navigate(['/edit-report', id]);
  }

  getSearch(event: any) {
    let keyWord = event.value;
    let datas: Array<any> = [];
    let objID = {};
    let resolve = {};

    this.service.getSearch(9, keyWord).subscribe((data) => {
      this.checkDataSearch = false;

      if (data.length < 1) {
        this.dataReports = [];
        return;
      }

      for (const key in data) {
        objID = {
          id: data[key].id,
          createAt: data[key].createAt,
        };
        resolve = Object.assign(data[key].reportData, objID);
        datas.push(resolve);
      }

      this.dataSearch = datas;

      this.getDataReport();
    });
  }

  deleteReport(id: number) {
    if (confirm('Do you want to delete this report?')) {
      this.service.deleteReport(id).subscribe((data) => {
        alert('Successful delete.');
        this.getDataReport();
      });
    }
  }

  pageChange(event: number) {
    this.p = event;
    this.getDataPagination();
    // console.log(event);
  }

  getDataPagination() {
    let datas: Array<any> = [];
    let objID = {};
    let resolve = {};
    this.service
      .getDataPagination(9, this.p, this.sortBy, this.typeSort)
      .subscribe((data) => {
        console.log(data);
        for (const key in data) {
          objID = {
            id: data[key].id,
            createAt: data[key].createAt,
          };
          resolve = Object.assign(data[key].reportData, objID);
          datas.push(resolve);
        }

        this.dataReports = datas;

        if (this.checkDataSearch === false) {
          if (this.dataSearch.length > 1) {
            this.dataReports = this.dataSearch;
          }
        }
      });
    console.log(this.p);
  }

  sort_by_createAt() {
    this.expression = !this.expression;
    if (this.typeSort === 'desc') {
      this.typeSort = 'asc';
    } else {
      this.typeSort = 'desc';
    }
    this.getDataPagination();
  }

  getSortClass() {
    return this.expression === true ? 'arrow-up' : 'arrow-down';
  }
}

// {
//   "projectID": 0,
//   "reportData": {abcxyz},
//   "reportTemplateID": 0,
//   "userID": 0
// }

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { report } from '../interfaces/Reports';

@Injectable({
  providedIn: 'root',
})
export class ServiceAppService {
  private changeString: string = 'https://595ab5e9f70a.ngrok.io';

  private RES_API_REPORT: string =
    this.changeString + '/report/get-report-by-userid/';

  private RES_API_DROPDOWNS: string =
    this.changeString + '/report-template/get-all';

  private RES_API_ReportID: string =
    this.changeString + '/report/get-one-report/';

  private RES_API_SEARCH: string =
    this.changeString + '/report/search-report-by-projectname-for-user/';

  private POST_DATA_SUBMIT: string = '';

  private POST_EDIT_REPORT: string =
    this.changeString + '/report/update-report/';

  private DELETE_REPORT: string = this.changeString + '/report/remove-report/';

  private DROP_DOWN_EDIT_FORM_PROJECT: string =
    this.changeString + '/project/get-all-project';

  private POST_REPORT_CLONE: string =
    this.changeString + '/report/create-report';

  private POST_NEW_REPORT: string = this.changeString + '/report/create-report';

  private GET_ONE_PROJECT_BY_ID: string =
    this.changeString + '/project/get-one-project/';

  private GET_ONE_PENALTY_REPORT_BY_USERID: string =
    this.changeString + '/penalty/get-penalty-by-userid/';

  private GET_DATA_PAGINATION: string =
    this.changeString + '/report/pagination-for-user/';

  private httpOptions: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getDataReport(id: number): Observable<any> {
    const url = this.RES_API_REPORT + `${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getDataDropdowns(): Observable<any> {
    const url = this.RES_API_DROPDOWNS;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  submitFormInput(dataSubmit: any) {
    const url = this.POST_DATA_SUBMIT;
    return this.httpClient.post<any>(url, dataSubmit, this.httpOptions);
  }

  getReportByID(id: any) {
    const url = this.RES_API_ReportID + `${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getSearch(id: any, keyWord: string) {
    const url = this.RES_API_SEARCH + `${id}` + '?projectName=' + `${keyWord}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  editReport(data: object, id: any) {
    const url = this.POST_EDIT_REPORT + `${id}`;
    return this.httpClient.put<any>(url, data, this.httpOptions);
  }

  addReport_Clone(data: object) {
    const url = this.POST_REPORT_CLONE;
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  deleteReport(id: any) {
    const url = this.DELETE_REPORT + `${id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  getDropdownEditForm_Project() {
    const url = this.DROP_DOWN_EDIT_FORM_PROJECT;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  addNewReport(data: object) {
    let url = this.POST_NEW_REPORT;
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  getOneProject(id: number) {
    let url = this.GET_ONE_PROJECT_BY_ID + `${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getPenaltyReportByUserID(id: any) {
    let url = this.GET_ONE_PENALTY_REPORT_BY_USERID + `${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getDataPagination(id: any, pageNo: number, sortBy: string, typeSort: string) {
    let url =
      this.GET_DATA_PAGINATION +
      `${id}` +
      '?pageNo=' +
      `${pageNo}` +
      '&sortBy=' +
      `${sortBy}` +
      '&typeSort=' +
      `${typeSort}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
}

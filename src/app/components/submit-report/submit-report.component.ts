import { Component, OnInit } from '@angular/core';
import { IObjectKeysInput } from 'src/app/interfaces/Reports';
import { ServiceAppService } from 'src/app/services/service-app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submit-report',
  templateUrl: './submit-report.component.html',
  styleUrls: ['./submit-report.component.scss'],
})
export class SubmitReportComponent implements OnInit {
  // dataInputs: IObjectKeysInput = {};

  constructor(
    private service: ServiceAppService,
    private route: ActivatedRoute
  ) {}

  statusFormInput: boolean = false;

  // dataFields: string[] = [];

  // dataValueInput!: IObjectKeysInput;

  datasDopdowns: Array<any> = [];
  dataFormInput: object = {};
  data_ID_projectName: Array<any> = [];
  data_reportTemplateID!: number;
  reportName: string = '';

  ngOnInit(): void {
    // this.dataFields = this.Convert_to_array(this.service.dataField);

    // if (this.service.testDataInput.length > 0) {
    //   this.dataValueInput = this.service.testDataInput;
    // }

    // this.changeKey();

    // if (this.dataValueInput) {
    //   this.setDataInput(this.dataValueInput);
    // }

    this.getDataDropdowns();

    // console.log(this.dataInputs);

    console.log(this.route.snapshot.paramMap.get('id'));
  }

  // Convert_to_array(stringDataField: string): string[] {
  //   return stringDataField.split(',');
  // }

  // changeKey(): void {
  //   let dataInput = this.Convert_to_array(this.service.dataField);
  //   for (let i = 0; i < dataInput.length; i++) {
  //     this.dataInputs[dataInput[i]] = '';
  //   }
  // }

  // getDataInput(data: string): void {
  //   for (const key in this.dataInputs) {
  //     if (Object.keys(data)[0] === key) {
  //       this.dataInputs[key] = Object.values(data)[0];
  //     }
  //   }
  //   console.log(this.dataInputs);
  // }

  // setDataInput(data: IObjectKeysInput): void {
  //   for (const keyInput in this.dataInputs) {
  //     for (const keyData in data) {
  //       if (keyInput === Object.keys(data[keyData])[0]) {
  //         this.dataInputs[keyInput] = Object.values(data[keyData])[0];
  //       }
  //     }
  //   }
  // }

  getDataDropdowns() {
    let dataDropdowns = { id: '', reportName: '', field: '' };
    let arr: Array<any> = [];
    this.service.getDataDropdowns().subscribe((data) => {
      console.log(data);

      for (const key in data) {
        dataDropdowns = {
          id: data[key].id,
          reportName: data[key].reportName,
          field: data[key].field,
        };

        arr.push(dataDropdowns);
      }
      this.datasDopdowns = arr;
      console.log(this.datasDopdowns);
    });
  }

  getDataFields(id: number, reportName: string) {
    let datas = this.datasDopdowns;
    this.reportName = reportName;
    this.data_reportTemplateID = id;
    for (const key in datas) {
      // console.log(datas[key]);
      if (datas[key].id === id) {
        this.dataFormInput = datas[key];
      }
    }
    this.statusFormInput = true;
  }
}

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { IObjectKeysInput } from 'src/app/interfaces/Reports';
import { ServiceAppService } from 'src/app/services/service-app.service';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit, OnChanges {
  @Input() dataFormInput: object = {};
  @Input() data_reportTemplateID!: number;

  _dataFormInput: object = {};

  dataInputs: IObjectKeysInput = {};

  dataFields: string[] = [];

  dataValueInput!: IObjectKeysInput;

  datasDopdowns: Array<any> = [];

  dataDropdownsProject: Array<any> = [];

  reportTemplateID!: number;

  projectID!: number;

  project: string = '';

  hccProjectCode: string = '';

  customerName: string = '';

  totalMember!: number;

  constructor(private service: ServiceAppService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    this._dataFormInput = changes.dataFormInput.currentValue;

    this.clean_dataInputs(this.dataInputs);

    this.dataFields = this.Convert_to_array(
      Object.values(this._dataFormInput)[2]
    );

    this.changeKey(Object.values(this._dataFormInput)[2]);

    this.reportTemplateID = changes.data_reportTemplateID.currentValue;
    console.log(changes.data_reportTemplateID.currentValue);
  }

  ngOnInit(): void {
    this._dataFormInput = this.dataFormInput;

    this.dataFields = this.Convert_to_array(
      Object.values(this._dataFormInput)[2]
    );

    if (this._dataFormInput) {
      this.changeKey(Object.values(this._dataFormInput)[2]);
    }

    if (this.dataValueInput) {
      this.setDataInput(this.dataValueInput);
    }

    this.getDropdownEditForm_Project();

    console.log(this.dataInputs);
  }

  Convert_to_array(stringDataField: string): string[] {
    if (!stringDataField) {
      return [];
    }
    return stringDataField.split(',');
  }

  changeKey(dataField: string): void {
    let dataInput = this.Convert_to_array(dataField);
    for (let i = 0; i < dataInput.length; i++) {
      this.dataInputs[dataInput[i]] = '';
    }
  }

  getDataInput(data: string): void {
    for (const key in this.dataInputs) {
      if (Object.keys(data)[0] === key) {
        this.dataInputs[key] = Object.values(data)[0];
      }
    }
    this.dataInputs.project = this.project;
    this.dataInputs.hccProjectCode = this.hccProjectCode;
    this.dataInputs.customerName = this.customerName;
    this.dataInputs.totalMember = this.totalMember.toString();
    console.log(this.dataInputs);
  }

  setDataInput(data: IObjectKeysInput): void {
    for (const keyInput in this.dataInputs) {
      for (const keyData in data) {
        if (keyInput === Object.keys(data[keyData])[0]) {
          this.dataInputs[keyInput] = Object.values(data[keyData])[0];
        }
      }
    }
  }

  clean_dataInputs(dataInputs: IObjectKeysInput) {
    for (const key in dataInputs) {
      delete dataInputs[key];
    }
  }

  getDropdownEditForm_Project() {
    let dataDropdownsProject: Array<object> = [];
    let dataObjProject = { id: '', projectName: '' };
    this.service.getDropdownEditForm_Project().subscribe((data) => {
      for (const key in data) {
        dataObjProject = {
          id: data[key].id,
          projectName: data[key].projectName,
        };
        dataDropdownsProject.push(dataObjProject);
      }
      this.dataDropdownsProject = dataDropdownsProject;
      // console.log(this.dataDropdownsProject);
    });
  }

  getIDProject(id: number, project: string) {
    console.log(id);
    this.projectID = id;
    this.project = project;
    this.service.getOneProject(id).subscribe((data) => {
      console.log(data);
      this.hccProjectCode = data.hccProjectCode;
      this.customerName = data.customerName;
      this.totalMember = data.totalMember;
    });
  }

  addNewReport() {
    this.service
      .addNewReport({
        projectID: this.projectID,
        reportData: this.dataInputs,
        reportTemplateID: this.reportTemplateID,
        userID: 9,
      })
      .subscribe((data) => {
        alert('Successfully added new.');
        this.router.navigate(['/reports']);
      });
  }
}

import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IObjectKeysInput } from 'src/app/interfaces/Reports';
import { ServiceAppService } from 'src/app/services/service-app.service';

@Component({
  selector: 'app-input-form-edit',
  templateUrl: './input-form-edit.component.html',
  styleUrls: ['./input-form-edit.component.scss'],
})
export class InputFormEditComponent implements OnInit {
  dataInputs: IObjectKeysInput = {};

  dataFields: string[] = [];

  dataValueInput!: IObjectKeysInput;

  projectID!: number;

  reportTemplateID!: number;

  constructor(
    private service: ServiceAppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.getReportByID(this.route.snapshot.paramMap.get('id'));
    }

    this.getProjectID();
  }

  Convert_to_array(stringDataField: string): string[] {
    if (!stringDataField) {
      return [];
    }
    return stringDataField.split(',');
  }

  changeKey(dataField: string[]): void {
    for (let i = 0; i < dataField.length; i++) {
      this.dataInputs[dataField[i]] = '';
    }
  }

  getDataInput(data: string): void {
    for (const key in this.dataInputs) {
      if (Object.keys(data)[0] === key) {
        this.dataInputs[key] = Object.values(data)[0];
      }
    }

    console.log(this.dataInputs);
  }

  setDataInput(data: IObjectKeysInput): void {
    for (const keyInput in this.dataInputs) {
      for (const keyData in data) {
        if (keyInput === keyData) {
          console.log(data[keyData]);
          this.dataInputs[keyInput] = data[keyData];
        }
      }
    }
  }

  getReportByID(id: any) {
    this.service.getReportByID(id).subscribe((data) => {
      this.dataFields = Object.keys(data.reportData);
      this.dataValueInput = data.reportData;

      this.changeKey(this.dataFields);

      if (this.dataValueInput) {
        this.setDataInput(this.dataValueInput);
      }
      console.log(this.dataValueInput);
    });
  }

  getProjectID() {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.getDropdownEditForm_Project().subscribe((data) => {
      for (const key in data) {
        for (const keyReport in data[key].report) {
          if (data[key].report[keyReport].id === Number(id)) {
            this.projectID = data[key].report[keyReport].projectID;
            this.reportTemplateID =
              data[key].report[keyReport].reportTemplateID;
          }
        }
      }
    });
  }

  submitEdit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.service
      .editReport(
        {
          userID: 9,
          projectID: this.projectID,
          reportTemplateID: this.reportTemplateID,
          reportData: this.dataInputs,
        },
        14
      )
      .subscribe((data) => {
        alert('Successful fix.');
        this.router.navigate(['/reports']);
      });
  }
}

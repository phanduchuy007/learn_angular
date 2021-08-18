import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IObjectKeysInput } from 'src/app/interfaces/Reports';
import { ServiceAppService } from 'src/app/services/service-app.service';

@Component({
  selector: 'app-input-addnew-report-component',
  templateUrl: './input-addnew-report-component.component.html',
  styleUrls: ['./input-addnew-report-component.component.scss'],
})
export class InputAddnewReportComponentComponent implements OnInit {
  @Input() dataField: string = '';
  @Input() dataValueInput: IObjectKeysInput = {};
  @Output() dataInput = new EventEmitter();

  @Input() project!: string;
  @Input() hccProjectCode!: string;
  @Input() customerName!: string;
  @Input() totalMember!: number;

  constructor(private service: ServiceAppService) {}

  field: string = '';
  valueInputs: IObjectKeysInput = {};
  input: string = '';

  _project: string = '';
  _hccProjectCode: string = '';
  _customerName: string = '';
  _totalMember!: number;

  ngOnChanges(): void {
    this.field = this.dataField;
    this.valueInputs = this.dataValueInput;
    this._project = this.project;
    this._hccProjectCode = this.hccProjectCode;
    this._customerName = this.customerName;
    this._totalMember = this.totalMember;
  }

  ngOnInit(): void {
    this.field = this.dataField;
    this.checkValueInput(this.dataValueInput, this.dataField);
  }

  Convert_to_array(stringDataField: string): string[] {
    return stringDataField.split(',');
  }

  sentTextInput(elm: string): void {
    let dataInput = {};
    dataInput = {
      [elm]: (<HTMLInputElement>document.getElementById(elm)).value,
    };
    this.dataInput.emit(dataInput);
  }

  checkValueInput(dataValueInput: IObjectKeysInput, id: string): void {
    for (const key in dataValueInput) {
      if (key === id) {
        this.input = dataValueInput[key];
      }
    }
  }

  checkField() {
    return this.field === 'project' ||
      this.field === 'customerName' ||
      this.field === 'hccProjectCode' ||
      this.field === 'totalMember'
      ? false
      : true;
  }

  checkProject() {
    return this.field === 'project' ? true : false;
  }

  check_hccProjectCode() {
    return this.field === 'hccProjectCode' ? true : false;
  }

  check_customerName() {
    return this.field === 'customerName' ? true : false;
  }

  check_totalMember() {
    return this.field === 'totalMember' ? true : false;
  }

  check_to_disable() {
    return this.field === 'customerName' ||
      this.field === 'hccProjectCode' ||
      this.field === 'totalMember' ||
      this.field === 'project'
      ? true
      : false;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceAppService } from 'src/app/services/service-app.service';

import { IObjectKeysInput } from 'src/app/interfaces/Reports';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.scss'],
})
export class InputComponentComponent implements OnInit {
  @Input() dataField: string = '';
  @Input() dataValueInput: IObjectKeysInput = {};
  @Output() dataInput = new EventEmitter();

  constructor(private service: ServiceAppService) {}

  field: string = '';
  valueInputs: IObjectKeysInput = {};
  input: string = '';

  ngOnChanges(): void {
    this.field = this.dataField;
    this.valueInputs = this.dataValueInput;
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

  check_to_disable() {
    return this.field === 'customerName' ||
      this.field === 'hccProjectCode' ||
      this.field === 'totalMember' ||
      this.field === 'project'
      ? true
      : false;
  }
}

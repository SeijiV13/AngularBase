import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import * as jsPDF from 'jspdf';
import * as $ from 'jquery';
import { InitService } from '../init.config';
import { ValidationService } from '../../generic/services/validation.service';
import { DataPasserService } from '../../generic/services/data-passer.service';
@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input("form") form: string;
  @Input("child") child: boolean = false;
  @Input("parentGroup") parentGroup: FormGroup;
  createdGroup = new FormGroup({});
  //initialize Form Group
  formGroup: FormGroup;
  fields: any;
  //get forms

  constructor(
    private _init: InitService,
    private route: ActivatedRoute,
    private router: Router,
    private validationService: ValidationService,
    private fb: FormBuilder,
    private dataPasserService: DataPasserService) {
  }

  ngOnInit() {
    //this.formGroup = this.fb.group({});
    if (this.child)
      this.createChildForm(this.parentGroup, this.form);
    else {
      this.fields = this._init.getForms(this.form).fields;
      this.createForm();
      this.createRows();
    }

  }

  createRows() {
    let numOfColumns = this._init.getForms(this.form).columns;
    let sizeOfCol = 12 / parseInt(numOfColumns);
    setTimeout(() => {
      $(".row-field").addClass("col-sm-" + sizeOfCol.toString());
    }, 10)

  }

  createForm() {
    for (let field of this.fields) {
      if (field.type !== 'formarray' && field.type !== 'formgroup' && field.type !== 'daterange') {
        let fieldControl = this.createdGroup.addControl(field.controlname, new FormControl(field.value, [

        ]));
        if (field.validations) {
          this.applyValidations(field.validations, field.controlname);
        }
      }
      else if (field.type === 'daterange') {
        this.createdGroup.addControl(field.dateOneControlName, new FormControl(field.value));
        this.createdGroup.addControl(field.dateTwoControlName, new FormControl(field.value));
      }

    }
  }

  createChildForm(parentGroup, group) {
    for (let field of group.fields) {
      if (field.type !== 'formarray' && field.type !== 'formgroup') {
        this.createdGroup.addControl(field.controlname, new FormControl(field.value));
      }
      parentGroup.addControl(group.controlname, this.createdGroup);
      if (field.validations) {
        this.applyValidations(field.validations, field.controlname);
      }

    }
    this.getChildFields(group.fields);

  }
  getChildFields(fields) {
    this.fields = fields;
  }

  applyValidations(validators, controlname) {
    for (let validator of validators) {
      this.createdGroup.controls[controlname].setValidators(this.validationService[validator])
    }

  }

  submitForm() {
    console.log(this.createdGroup);
  }


}

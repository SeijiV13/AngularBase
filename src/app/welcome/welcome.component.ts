import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthenticateService } from "../login/loginService/authenticate.service";
import { ActivatedRoute } from '@angular/router';
import { DataPasserService } from '../generic/services/data-passer.service';
import { DropdownService } from '../generic/services/dropdown.service';
import { DashboardService } from '../generic/services/dashboard.service';
import { GenericModalComponent } from '../generic/generic-modal/generic-modal.component';
import { Router } from '@angular/router';
import { HttpClient } from '../generic/httpClient.config';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { GenericTableComponent } from '../generic/generic-table/generic-table.component';
import { AgmCoreModule } from '@agm/core';
import * as jsPDF from 'jspdf';
import * as $ from 'jquery';
import { InitService } from '../generic/init.config';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  providers: [AuthenticateService],
  styleUrls: ['./welcome.component.css'],
})

export class WelcomeComponent implements OnInit {
  //initialize Form Group

  fields: any;
  //get forms

  constructor(
    private _init: InitService,
    private _service: AuthenticateService,
    private route: ActivatedRoute,
    private router: Router,
    private dataPasserService: DataPasserService,
    private dropdownService: DropdownService,
    private dashboardService: DashboardService,
    private http: HttpClient,
    private fb: FormBuilder) {
    // this.fields = this._init.getForms("formGroup1");
  }

  ngOnInit() {


  }






}

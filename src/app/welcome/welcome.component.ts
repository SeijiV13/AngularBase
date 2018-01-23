import { Component, ViewChild } from '@angular/core';
import { AuthenticateService } from "../login/loginService/authenticate.service";
import { ActivatedRoute } from '@angular/router';
import { DataPasserService } from '../generic/services/data-passer.service';
import { DropdownService } from '../generic/services/dropdown.service';
import { DashboardService } from '../generic/services/dashboard.service';
import { GenericModalComponent} from '../generic/generic-modal/generic-modal.component';
import { Router } from '@angular/router';
import { HttpClient} from '../generic/httpClient.config';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { GenericTableComponent} from '../generic/generic-table/generic-table.component';
import { AgmCoreModule } from '@agm/core';

import * as $ from 'jquery';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  providers: [AuthenticateService],
  styleUrls: ['./welcome.component.css'],
})

export class WelcomeComponent {
   editorOptions = {
    placeholder: "insert content..."
  };
  lat: number = 51.678418;
  lng: number = 7.809007;
  formGroup: FormGroup;
  @ViewChild('genericTable') genericTable: GenericTableComponent;
  @ViewChild('genericModal') genericModal: GenericModalComponent;
  headers = [
    'Request No.',
    'Title No.',
    'Request Status',
    'Province',
    'City',
  ];
  results = [
    /*{'reqNo': '1', 'titleNo': '123', 'reqStatus': 'New', 'province': 'Batangas', 'city': 'Batangas'},
    {'reqNo': '2', 'titleNo': '234', 'reqStatus': 'New', 'province': 'Batangas', 'city': 'Batangas'},
    {'reqNo': '3', 'titleNo': '345', 'reqStatus': 'New', 'province': 'Batangas', 'city': 'Batangas'}*/
  ]
  keys = [
      {"name":'requestNo', "behavior": 'clickable'},
      {"name":'titleNo', },
      {"name":'reqStatus'},
      {"name":'province'},
      {"name":'city'},
  ]
  //JSON Contains  NAME, ID, , LOGO, TYPE, BEHAVIOR, 
  buttons = [
    {'name': "Select", 'id': "select-button", 'logo': 'glyphicon glyphicon-pencil', 'type': 'select', 'behavior':'single'}
  ]

  constructor(
    private _service: AuthenticateService,
    private route: ActivatedRoute,
    private router: Router,
    private dataPasserService: DataPasserService,
    private dropdownService: DropdownService,
    private dashboardService: DashboardService,
    private http :HttpClient,
    private fb: FormBuilder) {

  }

  openModal(){
    this.genericModal.show();
  }
  ngOnInit() {
     //SET TITLE OF PAGE
     this.dataPasserService.sendPageTitle("DASHBOARD");
     this.formGroup = this.fb.group({
       quill: [''],
       propRefNo: ['', Validators.required],
       applicationDate: [''],
       status:['', Validators.required],
       applicationNo: ['', Validators.required]
     })
  }
  doSearch(){
    console.log(this.formGroup.controls['quill'].value)
    this.genericTable.doSearch('re/requests?requestNo=');
  }

  
  
}

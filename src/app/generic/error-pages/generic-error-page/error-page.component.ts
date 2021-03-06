import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { AuthenticateService } from "../../../login/loginService/authenticate.service";
import * as $ from 'jquery';

@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html',
  providers: [AuthenticateService]
})
export class ErrorPageComponent implements OnInit {
  nextPageInd: string;
  loginPressed: boolean = false;
  message: string = "Oops! Something went wrong.";
  constructor(private authenticate: AuthenticateService, private cookieService: CookieService) {

    if (localStorage.getItem("redirectLogin") == "true") {
      this.nextPageInd = "Login";
      localStorage.removeItem("redirectLogin");
    }
    else if (localStorage.getItem("token") && localStorage.getItem("token").toString().length > 0)
      this.nextPageInd = "Home";
    else
      this.nextPageInd = "Login";

    if (localStorage.getItem("errorMessage")) {
      this.message = localStorage.getItem("errorMessage");
      localStorage.removeItem("errorMessage")
    }
  }

  logout() {
    if (localStorage.getItem("token") &&
      localStorage.get("usrid")) {
      this.loginPressed = true;
      var usrid = localStorage.get("usrid");
      this.authenticate.remoteLogout(usrid).subscribe(
        (data) => {
          localStorage.removeItem("token");
        }, (error) => {/**console.log(error.text());**/ },
        () => { window.location.replace('/'); }
      );
    }
    window.location.replace('/');
  }

  ngOnInit() {
    $(window).resize();
  }
}

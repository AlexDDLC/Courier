import { Component, OnInit } from '@angular/core';
import { ApiConnectionService } from '../../services/api-connection.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkUserValues } from '../../models/loginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Api: ApiConnectionService, private router: Router) { }

  failsLogin: any = 0;
  errorUsername: boolean = false;
  errorPassword: boolean = false;
  errorLogin: boolean = false;
  errorMessageLogin: string = '';
  errorMessageUsername: string = '';
  errorMessagePassword: string = '';
  username: string;

  LoginData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  checkCharacters(username, password) {
    const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (specialCharacters.test(username)) {
      this.errorUsername = true;
      this.errorMessageUsername = 'The username must not contain special characters.';
      return true;
    }
    else if (username == '') {
      this.errorUsername = true;
      this.errorMessageUsername = 'The username must not be empty.';
      return true;
    }
    else if (username.length > 10) {
      this.errorUsername = true;
      this.errorMessageUsername = 'The username must not contain more than 10 digits.';
      return true;
    }
    else if (specialCharacters.test(password)) {
      this.errorPassword = true;
      this.errorMessagePassword = 'The password must not be empty or contain special characters.';
      return true;
    }
    else if (password == '') {
      this.errorPassword = true;
      this.errorMessagePassword = 'The password must not be empty.';
      return true;
    }
    else {
      return false;
    }
  }

  Login(form: checkUserValues) {
    this.Api.logIn(form).subscribe(data => {
      let DataArray = Object.keys(data).map((key) => [Number(key), data[key]]);

      if (this.checkCharacters(form.username, form.password) == true) {
        this.errorLogin = true;
        this.errorMessageLogin = 'Check the fields Username and password';
      }
      else {
        this.errorUsername, this.errorPassword = false;
        if (DataArray[2][1] === true) {
          sessionStorage.setItem('user', form.username);
          this.router.navigate(['packagelist']);
        }
        else {
          this.failsLogin++;
          this.errorLogin = true;
          this.errorMessageLogin = 'Incorrect username or password';
        }
      }
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['packagelist']);
    }
  }

}

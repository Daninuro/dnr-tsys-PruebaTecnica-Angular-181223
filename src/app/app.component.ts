import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

import { ApiService } from './api.service';

import { Router, RouterOutlet } from '@angular/router';

import { environment } from '../environments/environments';
import { CommonModule } from '@angular/common';

const AUTHED_KEY = 'authed';
const REQ_TOKEN_KEY = 'req-token-key';
const SESSION_ID = 'session_id';
const LOGGED = 'logged';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dnr-tsys-PruebaTecnica-Angular-181223';

  isLoginFailed = false;
  isLoggedInView = false;
  errorMessage = '';

  usernameView: string | undefined;
  
  isLoggedIn = false;
  tmdb_api_key = environment.TMDB_API_KEY;

  isReqTokenSet = false;

  request_token?: string;

  form: any = {
    username: null,
    password: null
  };

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService,
     public router: Router, private apiSvc: ApiService) {
  }

  ngOnInit(): void {
    console.log("isLoggedIn: " + this.isLoggedIn + "\nisReqTokenSet: " + this.isReqTokenSet)
    if (window.sessionStorage.getItem(AUTHED_KEY) != null)
    {
      console.log("Request Token: " + window.sessionStorage.getItem(REQ_TOKEN_KEY))
      this.isReqTokenSet = true;

      if (window.sessionStorage.getItem(LOGGED) != null)
      {
        this.isLoggedIn = true;
      }
    }
    else
    {
      this.isReqTokenSet = false;
    }
  }

  generateAccessToken() {
    this.apiSvc.generateAccessToken().subscribe(
      data => {
        console.log(JSON.stringify(data))
        this.request_token = data["request_token"]
        console.log("Request token: " + this.request_token)
        this.grabUserPerm()
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    )
    
  }

  grabUserPerm() {
    window.sessionStorage.setItem(AUTHED_KEY, "yes");
    window.sessionStorage.setItem(REQ_TOKEN_KEY, this.request_token!)
    window.location.href = 'https://www.themoviedb.org/authenticate/' + this.request_token + '?redirect_to=https://main.d15pa50iyql6j6.amplifyapp.com/home';
  }

  loadUserInfo(req_token: string) {

    console.log("Returned!")

      this.apiSvc.generateNewSession(req_token).subscribe(
        data => {
          console.log("Userperm!: " + JSON.stringify(data))
          window.sessionStorage.setItem(SESSION_ID, data["session_id"])
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      )
  }

  onSubmit(): void {
    this.generateAccessToken
    this.apiSvc.loginWithToken(this.form.username, this.form.password, window.sessionStorage.getItem(REQ_TOKEN_KEY)!).subscribe(
      data => {
        this.usernameView = this.form.username;
        
        window.sessionStorage.setItem(LOGGED, 'yes')
        this.isLoggedInView = true;

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        setTimeout(() => 
          {
            window.location.reload();
          },
          2000);


        },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    )
  }
  
  logout(): void {
    this.isLoggedIn = false;
    this.isReqTokenSet = false;
    window.sessionStorage.removeItem(AUTHED_KEY);
    window.sessionStorage.removeItem(REQ_TOKEN_KEY);
    window.sessionStorage.removeItem(SESSION_ID);
    window.sessionStorage.removeItem(LOGGED)
    this.router.navigate(['/home']);
  }
}



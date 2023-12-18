import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = ''


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  user:any = null;

  login(username: string, password: string): Observable<any> {
    
    this.user = null;

    this.user = {
      "username": username,
      "password": password
    };

    return this.http.post(AUTH_API + 'login', JSON.stringify(this.user), { headers: { 'Content-Type': 'application/json'}});
  }

  findRole(username: string): Observable<any> {
    return this.http.get(AUTH_API + "users/" + username);
  }


}

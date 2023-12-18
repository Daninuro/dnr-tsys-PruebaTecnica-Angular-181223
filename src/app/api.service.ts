import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environments';

import { Films } from './models/films.model';

import { Series } from './models/series.model';

const BASE_URL = 'https://api.themoviedb.org/3/'

const AUTH_API = 'authentication/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  generateAccessToken(): Observable<any> {
    return this.http.get(BASE_URL + AUTH_API + "token/new?api_key=" + environment.TMDB_API_KEY);
  }

  generateNewSession(approvedToken: any): Observable<any> {
    
    var reqtok = {
    "request_token": approvedToken
    };

    console.log("req_tok: " + JSON.stringify(reqtok))

    return this.http.post((BASE_URL + AUTH_API + "session/new?api_key=" + environment.TMDB_API_KEY), JSON.stringify(reqtok), { headers: { 'Content-Type': 'application/json'}});
  }

  loginWithToken(username: string, password: string, req_token: string): Observable<any> {
    // token/validate_with_login
    var req = {
      "username": username,
      "password": password,
      "request_token": req_token
    };

    console.log("req: " + JSON.stringify(req))

    return this.http.post((BASE_URL + AUTH_API + "token/validate_with_login?api_key=" + environment.TMDB_API_KEY),
    JSON.stringify(req), { headers: { 'Content-Type': 'application/json'}});
  }
  
  getPopularMovies(page:string): Observable<Films[]> {
    return this.http.get<Films[]>("https://api.themoviedb.org/3/movie/popular?api_key=" + environment.TMDB_API_KEY + "&page=" + page)
  }

  getMovie(id: any): Observable<any> {
    return this.http.get<Films>("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + environment.TMDB_API_KEY)
  }

  getPopularSeries(page:string): Observable<Series[]> {
    return this.http.get<Series[]>("https://api.themoviedb.org/3/tv/popular?api_key=" + environment.TMDB_API_KEY + "&page=" + page)
  }

  getSerie(id: any): Observable<any> {
    return this.http.get<Series>("https://api.themoviedb.org/3/tv/" + id + "?api_key=" + environment.TMDB_API_KEY)
  }


}

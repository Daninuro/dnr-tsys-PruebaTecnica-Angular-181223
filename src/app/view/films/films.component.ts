import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api.service';
import { Router, RouterLink } from '@angular/router';

const LOGGED = 'logged';
@Component({
  selector: 'app-films',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent {

  constructor(private apiSvc: ApiService, public router: Router) { }

  movies: any = null;

  page: number = 1;

  isLoggedIn = false;

  ngOnInit(): void {
    if (window.sessionStorage.getItem(LOGGED) != null)
      {
        this.isLoggedIn = true;
        this.instancePage()
      }
  }

  instancePage() {
    this.apiSvc.getPopularMovies(this.page.toString())
    .subscribe(result => {
      this.movies = result
    })
  }

  redirect() {
    setTimeout(() => 
        {
          this.router.navigate(['/home']);
        },
        2000);
  }

  previousPage() {
    if (this.page > 0) {
      this.page--; 
    }
    this.instancePage()
  }

  nextPage() {
    this.page++
    this.instancePage()
  }

  setPage(page: any) {
    this.page = page
    this.instancePage()
  }
}
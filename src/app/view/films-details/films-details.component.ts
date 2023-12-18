import { Component, OnInit } from '@angular/core';

import { Router  } from '@angular/router';

import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from '../../api.service';

const LOGGED = 'logged';


@Component({
  selector: 'app-films-details',
  standalone: true,
  imports: [],
  templateUrl: './films-details.component.html',
  styleUrl: './films-details.component.css'
})
export class FilmsDetailsComponent {
  constructor(public router: Router, private route: ActivatedRoute, private apiSvc: ApiService) { }

  isLoggedIn = false;

  idParam: any = null;

  movie: any;

  adult: string | undefined;

  ngOnInit(): void {
    if (window.sessionStorage.getItem(LOGGED) != null)
      {
        this.isLoggedIn = true;
        this.idParam = this.route.snapshot.paramMap.get('id');

    this.apiSvc.getMovie(this.idParam)
      .subscribe(
        data => {
          this.movie = data;
          this.adult = this.checkAdult();
        },
        error => {
          console.log(error)
        }
      )
      }
  }
  
  checkAdult(): string {
    return (this.movie.adult ? "Non-adult" : "For adults")
  }

  back() {
    this.router.navigate(['/films']);
  }

  redirect() {
    setTimeout(() => 
        {
          this.router.navigate(['/home']);
        },
        2000);
  }
}
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

const LOGGED = 'logged';
@Component({
  selector: 'app-series-details',
  standalone: true,
  imports: [],
  templateUrl: './series-details.component.html',
  styleUrl: './series-details.component.css'
})
export class SeriesDetailsComponent {

  constructor(private route: ActivatedRoute, private apiSvc: ApiService, private router: Router) { }
  editId: boolean = false;
  idParam: any = null;

  isLoggedIn = true;

  serie: any;

  adult: string | undefined;

  ngOnInit(): void {
    if (window.sessionStorage.getItem(LOGGED) != null)
    {
      this.isLoggedIn = true;
      this.idParam = this.route.snapshot.paramMap.get('id');

      this.apiSvc.getSerie(this.idParam)
        .subscribe(
          data => {
            this.serie = data;
            this.adult = this.checkAdult();
          },
          error => {
            console.log(error)
          }
        )
    }
  }

  checkAdult(): string {
    return (this.serie.adult ? "Non-adult" : "For adults")
  }

  back() {
    this.router.navigate(['/series']);
  }

  redirect() {
    setTimeout(() => 
        {
          this.router.navigate(['/home']);
        },
        2000);
  }


}

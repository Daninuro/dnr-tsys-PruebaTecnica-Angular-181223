import { Routes } from '@angular/router';
import { ErrorComponent } from './view/error/error.component';
import { HomeComponent } from './view/home/home.component';
import { FilmsComponent } from './view/films/films.component';
import { SeriesComponent } from './view/series/series.component';
import { SeriesDetailsComponent } from './view/series-details/series-details.component';
import { FilmsDetailsComponent } from './view/films-details/films-details.component';
import { ProfileComponent } from './view/profile/profile.component';

export const routes: Routes = [


    {
        path: '', redirectTo: '/home', pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'films',
        component: FilmsComponent
      },
      {
        path: 'series',
        component: SeriesComponent
      },
      {
        path: 'series/:id',
        component: SeriesDetailsComponent
      },
      {
        path: 'films/:id',
        component: FilmsDetailsComponent
      },

    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error' }

];

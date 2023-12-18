import { Routes } from '@angular/router';
import { ErrorComponent } from './view/error/error.component';

export const routes: Routes = [


    


    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error' }

];

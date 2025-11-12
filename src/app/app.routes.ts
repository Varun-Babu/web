import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Internships } from './components/internships/internships';
import { Hero } from './components/hero/hero';
import { OurProducts } from './components/our-products/our-products';
import { ConstructionApp } from './construction-app/construction-app';
import { Careers } from './components/careers/careers';
import { GetStarted } from './components/get-started/get-started';



export const routes: Routes = [
    { path: '', component: Home },
    { path: 'v4codeacademy', component: Internships },
    { path: 'products', component: OurProducts },
    { path: 'products/construction-manager', component: ConstructionApp },
    { path: 'careers', component: Careers },
    { path: 'get-started', component: GetStarted }


];

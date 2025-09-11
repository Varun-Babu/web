import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Hero } from "../hero/hero";
import { About } from "../about/about";
import { Internships } from '../internships/internships';
import { Projects } from '../projects/projects';
import { Services } from '../services/services';

@Component({
  selector: 'app-home',
  imports: [RouterModule,  Hero, About,Projects,Services],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}

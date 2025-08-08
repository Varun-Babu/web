import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";
import { About } from "./components/about/about";
import { Services } from "./components/services/services";
import { Projects } from "./components/projects/projects";
import { Internships } from "./components/internships/internships";
import { ContactForm } from "./components/contact-form/contact-form";
import { Footer } from "./components/footer/footer";
import { Home } from "./components/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, About, Services, Projects, Internships, ContactForm, Footer, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('devlabs-web-new');
}

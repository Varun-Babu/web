import { Component,HostListener, ElementRef  } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
 isMenuOpen = false;

  constructor(private eRef: ElementRef) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (this.isMenuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
}

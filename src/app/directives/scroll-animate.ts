import {
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  @HostBinding('class.animate') isVisible = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.observer.unobserve(this.el.nativeElement);
        }
      },
      {
        threshold: 0.2,
      }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

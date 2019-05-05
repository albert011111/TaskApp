import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appChecked]'
})
export class CheckedDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

    // tworze zmienna ktora reprezentuje obraz i renderuje to jako ikone :)
    const icon = this.el.nativeElement;

    // ustawiam ikonke
    this.renderer.setStyle(icon, 'list-style-image', 'url(/assets/doneIcon.png)');

    // dodane tlo pod napisem
    this.renderer.setStyle(icon, 'background', 'aquamarine');
  }



}

import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appToggleDesc]'
})
export class ToggleDescDirective implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    console.log(this.element.nativeElement);
    console.log(this.element.nativeElement.disabled);
    this.renderer.setProperty(this.element, "disabled", true)
  }

}

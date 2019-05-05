import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTaskAdded]'
})
export class TaskAvailableDirective implements OnInit {

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {

    const el = this.renderer.createElement("el");
    const text = this.renderer.createText("Click here");

    this.renderer.appendChild(this.element.nativeElement, el);
  }


  @HostListener("onmouseover", ['$event.target']) onMouseOver() {
    // this.renderer.setStyle(this.element.nativeElement, "backgroundImage", 'url(/assets/doneIcon.png)');
    this.renderer.setStyle(this.element.nativeElement, "fontSize", "50px");
  }


}

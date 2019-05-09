import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTaskAdded]'
})
export class TaskAvailableDirective implements OnInit {

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.appendTaskIcon();
  }

  private appendTaskIcon() {
    const icon = this.renderer.createElement("img");
    const taskImage = "assets/task.svg";
    this.renderer.setAttribute(icon, "src", taskImage);

    const parent = this.element.nativeElement;
    // console.log(parent);
    this.renderer.appendChild(parent, icon);
  }

  @HostListener("onmouseover", ['$event.target']) onMouseOver() {
    // this.renderer.setStyle(this.element.nativeElement, "backgroundImage", 'url(/assets/doneIcon.png)');
    this.renderer.setStyle(this.element.nativeElement, "fontSize", "50px");
  }


}

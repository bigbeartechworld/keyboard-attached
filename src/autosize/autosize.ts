import {
  Directive,
  OnInit,
  HostListener,
  Inject,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "ion-textarea[autosize]" // Attribute selector
})
export class AutosizeDirective implements OnInit {
  @HostListener("input", ["$event.target"])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(@Inject(ElementRef) public element: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => this.adjust(), 0);
  }

  adjust(): void {
    let textArea = this.element.nativeElement.getElementsByTagName(
      "textarea"
    )[0];
    textArea.style.overflow = "hidden";
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  }
}

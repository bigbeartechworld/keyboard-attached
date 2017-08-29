import { Directive, ElementRef, Renderer, ViewChild } from "@angular/core";
import { Platform, Events } from "ionic-angular";
import { Keyboard } from "@ionic-native/keyboard";

@Directive({
  selector: "[react-to-keyboard]" // Attribute selector
})
export class ReactToKeyboardDirective {
  public showKeyboard;
  public hideKeyboard;
  private defaultHeight: number;
  private defaultPaddingTop: number;
  private defaultPaddingBottom: number;
  private keyboardIsShowing: boolean = false;

  constructor(
    public el: ElementRef,
    public renderer: Renderer,
    private platform: Platform,
    public events: Events,
    public keyboard: Keyboard
  ) {
    if (platform.is("ios")) {
      this.defaultHeight = window.document.body.getBoundingClientRect().height;
      this.defaultPaddingTop = this.el.nativeElement.style.paddingTop;
      this.defaultPaddingBottom = this.el.nativeElement.style.paddingBottom;

      this.showKeyboard = this.keyboard.onKeyboardShow().subscribe(res => {
        // if (this.keyboardIsShowing) {
        //   // Ensure iOS didn't resize the body element randomly... ><
        //   this.renderer.setElementStyle(
        //     this.el.nativeElement.parentElement,
        //     "height",
        //     this.defaultHeight + "px"
        //   );
        //   return;
        // }
        this.keyboardIsShowing = true;

        this.el.nativeElement.style.paddingBottom =
          res.keyboardHeight.toString() + "px";
        // this.el.nativeElement.style.paddingTop = "3rem";

        this.events.publish("react-to-keyboard:padding-added");
      });

      this.hideKeyboard = this.keyboard.onKeyboardHide().subscribe(res => {
        this.keyboardIsShowing = false;

        // this.el.nativeElement.style.paddingTop = this.defaultPaddingTop;
        this.el.nativeElement.style.paddingBottom = this.defaultPaddingBottom;

        this.events.publish("react-to-keyboard:padding-removed");
      });
    }
  }

  ngOnDestroy() {
    if (this.showKeyboard) {
      this.showKeyboard.unsubscribe();
    }
    if (this.hideKeyboard) {
      this.hideKeyboard.unsubscribe();
    }
  }
}

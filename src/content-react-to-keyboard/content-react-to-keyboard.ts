import { Directive, ElementRef, Renderer, Input } from "@angular/core";
import { Platform, Events, Content } from "ionic-angular";
import { Keyboard } from "@ionic-native/keyboard";

@Directive({
  selector: "[content-react-to-keyboard]" // Attribute selector
})
export class ContentReactToKeyboardDirective {
  @Input("content") public content: Content;
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
      // this.defaultPaddingTop = this.el.nativeElement.style.paddingTop;
      this.defaultPaddingBottom = this.el.nativeElement.style.paddingBottom;

      this.showKeyboard = this.keyboard
        .onKeyboardShow()
        .subscribe(res => {
          this.keyboardIsShowing = true;

          this.el.nativeElement.style.paddingBottom = res.keyboardHeight.toString() + "px";

          this.content.scrollToBottom();
        });

      this.hideKeyboard = this.keyboard.onKeyboardHide().subscribe(res => {
        this.keyboardIsShowing = false;

        // this.el.nativeElement.style.paddingTop = this.defaultPaddingTop;
        this.el.nativeElement.style.paddingBottom = this.defaultPaddingBottom;
      });
    } else if (this.platform.is('android')) {
      this.showKeyboard = this.keyboard.onKeyboardShow().subscribe(res => {
        this.content.scrollToBottom();
      });

      this.hideKeyboard = this.keyboard.onKeyboardHide().subscribe(res => {
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

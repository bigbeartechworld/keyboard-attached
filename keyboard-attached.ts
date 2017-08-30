import { NgModule, APP_INITIALIZER } from "@angular/core";
import { IonicModule, Config } from "ionic-angular";

import { AutosizeDirective } from "./src/autosize/autosize";
import { ReactToKeyboardDirective } from "./src/react-to-keyboard/react-to-keyboard";
import { ContentReactToKeyboardDirective } from "./src/content-react-to-keyboard/content-react-to-keyboard";

@NgModule({
  declarations: [
    AutosizeDirective,
    ReactToKeyboardDirective,
    ContentReactToKeyboardDirective
  ],
  imports: [IonicModule],
  exports: [
    AutosizeDirective,
    ReactToKeyboardDirective,
    ContentReactToKeyboardDirective
  ]
})
export class KeyboardAttachedModule {}

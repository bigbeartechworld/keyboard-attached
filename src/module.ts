import { NgModule, APP_INITIALIZER } from "@angular/core";
import { IonicModule, Config } from "ionic-angular";

import { AutosizeDirective } from "./autosize/autosize";
import { ReactToKeyboardDirective } from "./react-to-keyboard/react-to-keyboard";
import { ContentReactToKeyboardDirective } from "./content-react-to-keyboard/content-react-to-keyboard";

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

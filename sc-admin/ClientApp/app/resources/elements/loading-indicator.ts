import { bindable, noView } from "aurelia-framework";
import * as nprogress from 'nprogress';

@noView([])
export class LoadingIndicator {
  @bindable loading = false;

  loadingChanged(newValue: any) {
    if (newValue) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}
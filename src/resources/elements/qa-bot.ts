import { bindable } from 'aurelia-framework';

export class QaBot {
  @bindable name;
  @bindable secret;

  private get url() {
    return 'https://webchat.botframework.com/embed/' + this.name + '\\?s=' + this.secret;
  }

}


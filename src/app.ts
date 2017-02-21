import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

@autoinject
export class App {

  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Title';
    config.map([
      { route: ['', 'bot'], name: 'bot', moduleId: 'views/bot-demo', title: 'bot demo' }
    ]);
  }
}

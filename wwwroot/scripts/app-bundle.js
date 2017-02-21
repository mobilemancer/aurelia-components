var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('app',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Title';
            config.map([
                { route: ['', 'bot'], name: 'bot', moduleId: 'views/bot-demo', title: 'bot demo' }
            ]);
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.autoinject
    ], App);
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/droid-bot',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var DroidBot = (function () {
        function DroidBot() {
        }
        DroidBot.prototype.valueChanged = function (newValue, oldValue) {
        };
        return DroidBot;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], DroidBot.prototype, "value", void 0);
    exports.DroidBot = DroidBot;
});

define('views/bot-demo',["require", "exports"], function (require, exports) {
    "use strict";
    var BotDemo = (function () {
        function BotDemo() {
            this.botName = "droid-worx-bot";
            this.secret = "QBuOcNrjjMc.cwA.16s.vR3iRE4E1DFbwEEmJLh5boGsHDCfgReUJbPV1g_37yc";
        }
        return BotDemo;
    }());
    exports.BotDemo = BotDemo;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!views/bot-demo.html', ['module'], function(module) { module.exports = "<template><iframe src.bind=\"'https://webchat.botframework.com/embed/' + botName + '?s=' + secret\"></iframe></template>"; });
define('text!resources/elements/droid-bot.html', ['module'], function(module) { module.exports = "<template><h1>${value}</h1></template>"; });
//# sourceMappingURL=app-bundle.js.map
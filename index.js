import {config} from './js/config.js';
import { MainCtrl } from './js/controllers/Main.controller.js';
import { DetailGrunaliseCtrl } from './js/controllers/DetailGruanali.controller.js';
import { DataService } from "./js/services/Data.service.js";

const myApp = angular.module('myApp', [
    'ui.router', 
    'pascalprecht.translate',
    'ui.router.state.events', 
    'ui.bootstrap',
    'kendo.directives',
    'tmh.dynamicLocale',
]);

myApp.config(config);

myApp
    .controller('MainCtrl', MainCtrl)
    .controller('DetailGrunaliseCtrl', DetailGrunaliseCtrl)
    .service("DataService", DataService);
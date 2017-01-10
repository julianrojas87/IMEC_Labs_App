"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var home_component_1 = require('./components/home/home.component');
var menu_component_1 = require('./components/menu/menu.component');
var t1_component_1 = require('./components/task1/t1/t1.component');
var t1_documentation_component_1 = require('./components/task1/t1.documentation/t1.documentation.component');
var t2_component_1 = require('./components/task2/t2/t2.component');
var t2_documentation_component_1 = require('./components/task2/t2.documentation/t2.documentation.component');
var t3_component_1 = require('./components/task3/t3/t3.component');
var t3_documentation_component_1 = require('./components/task3/t3.documentation/t3.documentation.component');
var t4_component_1 = require('./components/task4/t4.component');
var appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'task1', component: t1_component_1.Task1Component },
    { path: 't1-doc', component: t1_documentation_component_1.T1DocComponent },
    { path: 'task2', component: t2_component_1.Task2Component },
    { path: 't2-doc', component: t2_documentation_component_1.T2DocComponent },
    { path: 'task3', component: t3_component_1.Task3Component },
    { path: 't3-doc', component: t3_documentation_component_1.T3DocComponent },
    { path: 'task4', component: t4_component_1.Task4Component },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(appRoutes), forms_1.FormsModule, http_1.HttpModule],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, menu_component_1.MenuComponent, t1_component_1.Task1Component,
                t1_documentation_component_1.T1DocComponent, t2_component_1.Task2Component, t2_documentation_component_1.T2DocComponent, t3_component_1.Task3Component, t3_documentation_component_1.T3DocComponent, t4_component_1.Task4Component],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
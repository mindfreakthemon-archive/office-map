import { Directive, ElementRef, DynamicComponentLoader } from 'angular2/core';
import { Router, RouteData, RouterOutlet, ComponentInstruction } from 'angular2/router';
import { RouteRecognizer } from 'angular2/src/router/route_recognizer';
import { SyncRouteHandler } from 'angular2/src/router/sync_route_handler';

import { AdminLogin } from './admin.login';
import { AdminWelcome } from './admin.welcome';


@Directive({
    selector: 'admin-login-router-outlet'
})
export class AdminLoginRouterOutlet extends RouterOutlet {

    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, protected parentRouter: Router, nameAttr: string) {
        super(_elementRef, _loader, parentRouter, nameAttr);
    }

    activate(instruction: ComponentInstruction) {
        if (!this.isLoggedIn() && instruction.urlPath !== 'login') {
            let handler = new SyncRouteHandler(AdminLogin, {});
            let routeRecognizer = new RouteRecognizer('/admin/login', handler);
            instruction = routeRecognizer.generate({});
        }

        return super.activate(instruction);
    }

    isLoggedIn() {
        return window['AUTHENTICATED'];
    }
}

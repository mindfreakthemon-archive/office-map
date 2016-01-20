import { Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { Map } from '../../map/components/map';

@Component({
    selector: 'admin',
})
@View({
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, Toolbar, Map],
    templateUrl: 'admin/templates/admin.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: Map },
    { path: '/floor/:floor', as: 'Floor', component: Map }
])
export class AdminRouter {
    entityType: string = 'the default';

    constructor(public routeParams: RouteParams) {
        console.log(routeParams)
    }

    onTypeChange(entityType: string) {
        this.entityType = entityType;
    }
}

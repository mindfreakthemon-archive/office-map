import { COMMON_DIRECTIVES } from 'angular2/common';
import { Component, View } from 'angular2/core';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { Map } from '../../map/components/map';

@Component({
    selector: 'admin',
})
@View({
    directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES, Toolbar, Map],
    templateUrl: 'admin/templates/admin.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: Map },
    { path: '/floor/:floor', as: 'Floor', component: Map }
])
export class AdminRouter {
    entityType: string = 'the default';

    onTypeChange(entityType: string) {
        this.entityType = entityType;
    }
}

import { provide } from 'angular2/core';
import { ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT, APP_BASE_HREF, LocationStrategy, HashLocationStrategy, PathLocationStrategy } from 'angular2/router';
import { FORM_PROVIDERS } from 'angular2/common';
import { HTTP_PROVIDERS } from 'angular2/http';
import { bootstrap } from 'angular2/platform/browser';
import 'rxjs/Rx';

import { App } from '../shared/app/components/app';
import { FloorService } from '../shared/map/services/floor.service';
import { WorkerService } from '../shared/staff/services/worker.service';
import { AdminActionService } from '../shared/admin/services/admin.action.service';

bootstrap(App, [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    FloorService,
    WorkerService,
    AdminActionService
]);

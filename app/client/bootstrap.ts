import { provide } from 'angular2/core';
import { ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT, APP_BASE_HREF, LocationStrategy, HashLocationStrategy, PathLocationStrategy } from 'angular2/router';
import { FORM_PROVIDERS } from 'angular2/common';
import { HTTP_PROVIDERS } from 'angular2/http';
import { bootstrap } from 'angular2/platform/browser';
import 'rxjs/Rx';

import { App } from '../shared/app/components/app';

bootstrap(App, [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]);

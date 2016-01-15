import { Component, View, Input, CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/angular2';

import { EntityModel } from '../models/entity';

@Component({
    selector: 'entity-item-renderer',
})
@View({
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: 'entity/templates/entityItem.jade'
})
export class EntityItemRenderer {
    @Input() entity:EntityModel;

    constructor() {}
}

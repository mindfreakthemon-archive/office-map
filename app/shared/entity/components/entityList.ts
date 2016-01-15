import { Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/angular2';
import { Location } from 'angular2/router';

import { EntityModel } from '../models/entity';
import { EntityItemRenderer } from './entityItemRenderer';

@Component({
    selector: 'entity-list',
})
@View({
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, EntityItemRenderer],
    templateUrl: 'entity/templates/entityList.jade'
})
export class EntityList {
    entities: EntityModel[] = [
        new EntityModel('test')
    ]

    constructor(public location:Location) {
    }
}

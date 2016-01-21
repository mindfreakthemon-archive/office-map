import { COMMON_DIRECTIVES } from 'angular2/common';
import { Component, Input, Output, EventEmitter } from 'angular2/core';


@Component({
    selector: 'admin-tools',
    directives: [COMMON_DIRECTIVES],
    templateUrl: 'admin/templates/admin.tools.jade'
})
export class AdminTools {
    type: string;
    @Output() typeChange = new EventEmitter();

    changeType(type: string) {
        this.type = type;
        this.typeChange.next(type);
    }
}

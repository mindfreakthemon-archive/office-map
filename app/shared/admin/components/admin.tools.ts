import { CORE_DIRECTIVES, Component, Input, Output, EventEmitter } from 'angular2/angular2';


@Component({
    selector: 'admin-tools',
    directives: [CORE_DIRECTIVES],
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

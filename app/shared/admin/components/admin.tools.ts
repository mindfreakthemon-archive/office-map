import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { Router } from 'angular2/router';


@Component({
    selector: 'admin-tools',
    templateUrl: 'admin/templates/admin.tools.jade'
})
export class AdminTools {
    type: string;

    constructor(public router: Router) {};

    changeType(type: string) {
        this.type = type;

        let instruction = this.router.generate(['/AdminRouter', 'Action', { floor: 20, action: type }]);

        this.router.navigateByInstruction(instruction);

    }
}

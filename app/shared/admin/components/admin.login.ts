import { Component } from 'angular2/core';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { Http, Headers } from 'angular2/http';

import { Toolbar } from '../../app/components/toolbar';

@Component({
    directives: [ROUTER_DIRECTIVES, Toolbar],
    templateUrl: 'admin/templates/admin.login.jade'
})
export class AdminLogin {
    username: string;
    password: string;

    constructor(private router: Router, private http: Http) {}

    onSubmit(e) {
        this.authenticate()
            .then(() => this.authorize())
            .then(() => this.router.navigate(['/AdminRouter', 'Default']))
            .catch(() => {
                alert('Wrong!');
            });
    }

    authenticate() {
        let headers = new Headers();
        let data = JSON.stringify({
            username: this.username,
            password: this.password
        });

        headers.append('Content-Type', 'application/json');

        return this.http.post('/authenticate', data, { headers })
            .toPromise();
    }

    authorize() {
        window['AUTHENTICATED'] = true;
    }
}

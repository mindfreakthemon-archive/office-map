import { Component, Input } from 'angular2/core';

import { Tabs } from './tabs';


@Component({
    selector: 'tab',
    templateUrl: 'tabs/templates/tab.jade'
})
export class Tab {
    @Input() title: string;
    @Input() active = false;

    constructor(tabs: Tabs) {
        tabs.addTab(this);
    }
}

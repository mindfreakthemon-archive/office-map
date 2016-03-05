import { Component } from 'angular2/core';

import { Tab } from './tab';


@Component({
    selector: 'tabs',
    templateUrl: 'tabs/templates/tabs.jade'
})
export class Tabs {
    tabs: Tab[];

    constructor() {
        this.tabs = [];
    }

    selectTab(event, tab) {
        event.preventDefault();
        event.stopPropagation();

        this.tabs.forEach(tab => tab.active = false);

        tab.active = true;
    }

    addTab(tab: Tab) {
        if (this.tabs.length === 0) {
            tab.active = true;
        }

        this.tabs.push(tab);
    }
}

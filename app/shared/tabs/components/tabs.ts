import { Component, Input, Output, EventEmitter } from 'angular2/core';

import { Tab } from './tab';


@Component({
    selector: 'tabs',
    templateUrl: 'tabs/templates/tabs.jade'
})
export class Tabs {
    tabs: Tab[] = [];

    @Output() select = new EventEmitter<Tab>();

    selectTab(tab) {
        this.hideAll();

        tab.active = true;

        this.select.emit(tab);
    }

    addTab(tab: Tab) {
        if (this.tabs.length === 0) {
            tab.active = true;
        }

        this.tabs.push(tab);
    }

    hideAll() {
        this.tabs.forEach((tab: Tab) => tab.active = false);
    }
}

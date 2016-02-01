import { Pipe } from 'angular2/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe {
    transform(items: any[], args: any[]) {
        let key = args[0];
        let value = args[1];

        let multiple = value instanceof Array;

        return items.filter(item => multiple ? value.indexOf(item[key]) : item[key] === value);
    }
}
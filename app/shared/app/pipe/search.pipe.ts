import { Pipe } from 'angular2/core';

@Pipe({
    name: 'search'
})
export class SearchPipe {
    transform(items: any[], args: any[]) {
        let keys: string[] = args[0];
        let query = String(args[1]).toLowerCase();

        return items.filter(item => {
            return keys.map(key => item[key])
                .map(string => string.toLowerCase())
                .some(string => string.indexOf(query) > -1);
        });
    }
}
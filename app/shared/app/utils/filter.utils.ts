export class FilterUtils {
    static searchFilter(query: string, properties: string[]) {
        let queries = query
            .split(' ')
            .filter(q => q.length > 0)
            .map(q => q.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&').replace(/\w/gi, '$&.*'))
            .map(q => new RegExp(q, 'i'));

        return item => {
            let values = properties.map(key => item[key]);

            return queries.every(query => values.some(string => query.test(string)));
        };
    }
}

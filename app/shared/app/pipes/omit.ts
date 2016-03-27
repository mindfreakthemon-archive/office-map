import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
    name: 'omit'
})
export class Omit implements PipeTransform {

    transform(values: any[], args: any[]) {
        let property = args.shift();
        let value = args.shift();

        return values.filter(item => item[property] !== value);
    }
}

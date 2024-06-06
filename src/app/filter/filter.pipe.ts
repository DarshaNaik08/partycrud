import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    console.log(items,"gfyyfyf");
    if (!items) return [];
    if (!searchText) return items;
    return this.searchItems(items, searchText.toLowerCase());
  }
  private searchItems(items: any[], searchText:any): any[] {
   let results:any = [];
   console.log(items);
      items.forEach(it => {
        console.log(it);
        if (it.requester_name.toLowerCase().includes(searchText)) {
            results.push(it);
        }
      });
      console.log(results,"-------------")
      return results;
  }
}

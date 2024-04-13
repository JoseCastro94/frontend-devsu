import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto';
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( data: Producto[], page: number = 0, search: string = '' , nRegistro: number = 5): Producto[] {
    const pageSig = page + parseInt(nRegistro.toString());

    if ( search.length === 0 ){
      return data.slice(page, pageSig);
    }

    const filteredArrays = data.filter( item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()));
    return filteredArrays.slice(page, pageSig);
  }
}

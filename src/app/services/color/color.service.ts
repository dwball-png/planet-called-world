import { Injectable } from '@angular/core';
import * as chroma from 'chroma-js';
import { random } from 'chroma-js';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  // static colorNameMap: Map<string, string>;

  constructor() {
    // ColorService.colorNameMap = new Map(Object.entries((fabric.Color as any).colorNameMap));   
  }

  public randomColor(): string {
    return chroma.random().hex();
  }

  public randomPalette(size: number): string[] {
    const scale = chroma.scale([this.randomColor(), this.randomColor()]).mode('hsl');
    let palette = [];
    for (let i = 0; i < size; i++) {
      palette.push(scale(i*(1/size)).hex());
    }
    return palette;
  }
}

import { Injectable } from '@angular/core';
import * as chroma from 'chroma-js';
const ColorScheme = require('color-scheme');

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() {
  }

  public randomColor(): string {
    return chroma.random().hex();
  }

  public randomPalette(): string[] {
    const colorScheme = new ColorScheme;
    const schemes = ['mono', 'contrast', 'triade', 'tetrade'];
    colorScheme
      .from_hex(this.randomColor().split('#')[1])
      .scheme(schemes[Math.floor((Math.random() * schemes.length))]);
    return colorScheme.colors().map((color: string)  => { return chroma(color).hex() })
  }
}

import { Injectable } from '@angular/core';
import * as chroma from 'chroma-js';
const ColorScheme = require('color-scheme');
const Please = require('pleasejs');

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  public randomColor(): string {
    return chroma.random().hex();
  }

  public randomPalette(): string[] {
    const colorScheme = new ColorScheme();
    colorScheme
      .from_hex(this.removeHashFromHexString(this.randomColor()))
      .scheme(schemes.tetrade);
    let palette: string[] = colorScheme
      .colors()
      .map((color: string) => this.getColorHex(color));
    palette.unshift('#000000', '#FFFFFF');
    return palette;
  }

  private getColorHex(color: string): string {
    return chroma(color).hex();
  }

  private removeHashFromHexString(hex: string) {
    return hex.replace('#', '');
  }

  public setColorHexAlpha(color: string, alpha: number): string {
    return chroma(color).alpha(alpha).hex();
  }
}

const schemes = {
  mono: 'mono',
  contrast: 'contrase',
  triade: 'triade',
  tetrade: 'tetrade',
};

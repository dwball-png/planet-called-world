import { Injectable } from '@angular/core';
import * as chroma from 'chroma-js';
import { fabric } from 'fabric';

export const brushDefaults = {
  mode: brushModes.DRAW,
  color: '#000',
  width: 5,
};

export const enum brushModes {
  DRAW = 'draw',
  ERASE = 'erase',
  FILL = 'fill',
  MARKER = 'marker',
}

const enum eventButtons {
  LEFT = 1,
  RIGHT = 3,
  MIDDLE = 2,
}

@Injectable({
  providedIn: 'root',
})
export class FabricService {
  private canvasRef!: fabric.Canvas;
  private drawMode: string = brushModes.DRAW;

  constructor() {}

  public set canvas(surface: fabric.Canvas) {
    if (surface) {
      this.canvasRef = surface;
    }
  }

  public set brushColor(color: string) {
    this.canvasRef.freeDrawingBrush.color = color || brushDefaults.color;
  }

  public get brushColor() {
    return this.canvasRef.freeDrawingBrush.color || brushDefaults.color;
  }

  public set brushWidth(width: number) {
    this.canvasRef.freeDrawingBrush.width = width || brushDefaults.width;
  }

  public get brushWidth() {
    return this.canvasRef.freeDrawingBrush.width || brushDefaults.width;
  }

  public set brushMode(mode: brushModes) {
    this.drawMode = mode;
  }

  public get brushMode() {
    return this.drawMode as brushModes;
  }

  public initializeBrushToDefaults(): void {
    this.brushColor = brushDefaults.color;
    this.brushMode = brushDefaults.mode;
    this.brushWidth = brushDefaults.width;
  }

  public onMouseUp(event: fabric.IEvent<MouseEvent>): void {
    if (event.button === eventButtons.RIGHT) {
      if ((this.canvasRef as any)._isCurrentlyDrawing) {
        (this.canvasRef as any)._onMouseUpInDrawingMode(event);
      }
    } else {
      if (this.drawMode === brushModes.FILL) {
        if (event.currentTarget != null) {
          event.currentTarget.fill = this.brushColor;
        }
      }
      if (this.drawMode === brushModes.MARKER) {
        if (event.currentTarget != null) {
          // console.log(this.canvasRef.freeDrawingBrush);
          event.currentTarget.sendToBack();
          event.currentTarget.stroke = chroma(this.brushColor).alpha(1).hex();
        }
      }
    }
  }
}

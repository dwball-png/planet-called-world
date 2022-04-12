import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

export const brushDefaults = {
  color: '#000',
  width: 1,
}

export const enum brushModes {
  DRAW = 'draw',
  ERASE = 'erase',
  FILL = 'fill',
}

const enum eventButtons {
  LEFT = 1,
  RIGHT = 3,
  MIDDLE = 2, 
}

@Injectable({
  providedIn: 'root'
})
export class FabricService {
  private canvasRef!: fabric.Canvas;
  private drawMode: string = brushModes.DRAW;

  constructor() {
  }

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

  public onMouseUp(event: fabric.IEvent<MouseEvent>): void {
    if (event.button === eventButtons.RIGHT) {
      if ((this.canvasRef as any)._isCurrentlyDrawing) {
        (this.canvasRef as any)._onMouseUpInDrawingMode(event);
      }
    }
    if (this.drawMode === brushModes.FILL) {
      if (event.currentTarget != null) {
        event.currentTarget.fill = this.brushColor;
      }
    }
  }
}
import {
  Component,
  OnInit,
} from '@angular/core';
import * as chroma from 'chroma-js';
import { fabric } from 'fabric';
import { ColorService } from '../services/color/color.service';
import {
  brushModes,
  FabricService,
} from '../services/fabric/fabric.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  protected canvas!: fabric.Canvas;
  protected brushSizeButtons: BrushSizeButton[] = [
    { width: 1, disabled: true },
    { width: 5, disabled: false },
    { width: 15, disabled: false },
  ];
  public colorPalette: string[] = []

  constructor(
    private fabricService: FabricService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('fabricCanvas', {
      backgroundColor: '#ebebef',
      selection: false,
      preserveObjectStacking: true,
      isDrawingMode: true,
      fireRightClick: true,
      stopContextMenu: true,
    });

    this.fabricService.canvas = this.canvas;
    this.fabricService.brushMode = brushModes.DRAW;
    this.fabricService.brushColor = chroma.random().hex();
    this.canvas.on('mouse:up', (event: fabric.IEvent<MouseEvent>) => {
      this.fabricService.onMouseUp(event);
    });
    this.colorPalette = this.colorService.randomPalette();
  }

  setBrushSize(width: number): void {
    this.selectBrushSizeButton(width);
    this.fabricService.brushWidth = width;
  }

  setBrushColor(color: string) {
    this.fabricService.brushColor = color;
  }

  selectBrushSizeButton(width: number): void {
    this.brushSizeButtons = this.brushSizeButtons.map((button) => {
      return {
        ...button,
        disabled: button.width === width ? true : false,
      };
    });
  }

  getValidBrushSizesInPixels(): number[] {
    return this.brushSizeButtons.map((button) => {
      return button.width;
    });
  }

  isBrushSizeButtonDisabled(width: number): boolean {
    const button = this.brushSizeButtons.find((button) => {
      return button.width === width;
    });
    return button ? button.disabled : false;
  }

  toggleDrawMode(): void {
    if (this.fabricService.brushMode === brushModes.DRAW) {
      this.fabricService.brushMode = brushModes.MARKER;
      this.fabricService.brushColor = chroma.random().alpha(0.5).css();
      this.fabricService.brushWidth = 20;
    } else {
      this.fabricService.brushMode = brushModes.DRAW;
      this.fabricService.brushColor = chroma(this.fabricService.brushColor)
        .alpha(1)
        .hex();
    }
  }
}

export interface BrushSizeButton {
  width: number;
  disabled: boolean;
}

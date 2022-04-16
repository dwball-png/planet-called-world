import { Component, OnInit } from '@angular/core';
import * as chroma from 'chroma-js';
import { fabric } from 'fabric';
import { ColorService } from '../services/color/color.service';
import { brushModes, FabricService } from '../services/fabric/fabric.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  protected canvas!: fabric.Canvas;
  protected brushSizeButtons: BrushSizeButton[] = [
    { width: 1, disabled: false },
    { width: 5, disabled: true },
    { width: 15, disabled: false },
  ];
  public colorPalette: string[] = [];

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

    this.initializeFabricService();
    this.colorPalette = this.colorService.randomPalette();
  }

  initializeFabricService(): void {
    this.fabricService.canvas = this.canvas;
    this.fabricService.initializeBrushToDefaults();
    this.bindFabricServiceMouseEvents();
  }

  bindFabricServiceMouseEvents(): void {
    this.canvas.on('mouse:up', (event: fabric.IEvent<MouseEvent>) => {
      this.fabricService.onMouseUp(event);
    });
  }

  setBrushSize(width: number): void {
    this.selectBrushSizeButton(width);
    this.fabricService.brushWidth = width;
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

  setBrushColor(color: string) {
    if (this.fabricService.brushMode === brushModes.MARKER) {
      color = this.colorService.setColorHexAlpha(color, 0.5);
    } else {
      color = this.colorService.setColorHexAlpha(color, 1.0);
    }
    this.fabricService.brushColor = color;
  }

  toggleDrawMode(): void {
    if (this.fabricService.brushMode === brushModes.DRAW) {
      this.fabricService.brushMode = brushModes.MARKER;
      this.fabricService.brushWidth = 20;
    } else {
      this.fabricService.brushMode = brushModes.DRAW;
      this.setBrushSize(5);
    }
    this.setBrushColor(this.fabricService.brushColor);
  }
}

export interface BrushSizeButton {
  width: number;
  disabled: boolean;
}

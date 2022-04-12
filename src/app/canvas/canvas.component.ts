import { Component, Input, OnInit } from '@angular/core';
import * as chroma from 'chroma-js';
import { fabric } from 'fabric';
import { ColorService } from '../services/color/color.service';
import { brushDefaults, brushModes, FabricService } from '../services/fabric/fabric.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  public canvas!: fabric.Canvas

  constructor(
    private fabricService: FabricService,
  ) {}

  ngOnInit(): void {
    this.canvas = new fabric.Canvas(
      'fabricCanvas',
      {
        backgroundColor: '#ebebef',
        selection: false,
        preserveObjectStacking: true,
        isDrawingMode: true,
        fireRightClick: true,
        stopContextMenu: true,
      }
    );
    
    this.fabricService.canvas = this.canvas;
    // this.fabricService.brushColor = '#e3b';
    this.fabricService.brushMode = brushModes.FILL;
    this.fabricService.brushColor = chroma.random().hex();
    this.canvas.on('mouse:up', (event: fabric.IEvent<MouseEvent>) => {
      this.fabricService.onMouseUp(event);
    });
  }
}

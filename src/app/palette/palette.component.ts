import { Component, OnInit } from '@angular/core';
import { ColorService } from '../services/color/color.service';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

}

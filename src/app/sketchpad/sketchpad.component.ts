

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit
} from "@angular/core";
import { fromEvent, combineLatest } from "rxjs";
import { filter, tap, concatMap, mergeMap, takeUntil } from "rxjs/operators";

export enum Direction {
  up,
  left,
  down,
  right
}

export interface Cordinates {
  x: number,
  y: number,
}

export const DistanceConfig: any = {
  up: {
    x: 0,
    y: 10
  },
  left: {
    x: -10,
    y: 0
  },
  down: {
    x: 0,
    y: -10
  },
  right: {
    x: 10,
    y: 0
  }
};
@Component({

  selector: 'app-sketchpad',
  standalone: true,
  imports: [],
  templateUrl: './sketchpad.component.html',
  styleUrl: './sketchpad.component.scss'
})
export class SketchpadComponent implements OnInit, AfterViewInit {
  name = "Angular";
  cx: any;
  canvas = { width: 500, height: 500 };
  currentLocation = { x: 200, y: 200 };
  preDirection: string = '';

  locationList: Cordinates[] = [];

  @ViewChild("myCanvas", { static: false }) myCanvas: ElementRef;

  constructor(private el: ElementRef) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.cx = canvasEl.getContext("2d");

    const mouseDown$ = fromEvent(this.myCanvas.nativeElement, "mousedown");
    const mouseMove$ = fromEvent(this.myCanvas.nativeElement, "mousemove");
    const mouseUp$ = fromEvent(this.myCanvas.nativeElement, "mouseup");

    mouseDown$.pipe(concatMap(down => mouseMove$.pipe(takeUntil(mouseUp$))));

    const mouseDraw$ = mouseDown$.pipe(
      tap((e: any) => {
        this.cx.moveTo(e.offsetX, e.offsetY);
      }),
      concatMap(() => mouseMove$.pipe(takeUntil(mouseUp$)))
    );

    mouseDraw$.subscribe((e: any) => this.draw(e.offsetX, e.offsetY));
  }

  draw(offsetX: number, offsetY: number) {
    this.cx.lineTo(offsetX, offsetY);
    this.cx.stroke();
  }

  autoDraw() {
    const runTimes = 100;
    for (let i = 0; i < runTimes; i++) {
      this.excuteAutoDraw();
    }
  }

  excuteAutoDraw() {
    const direction = this.getDirection();

    const distance = DistanceConfig[direction];
    const newLocation = { ...this.currentLocation };
    newLocation.x = newLocation.x + distance.x;
    newLocation.y = newLocation.y + distance.y;

    if (this.isNewPath(newLocation)) {
      console.log(this.currentLocation, newLocation);
      this.cx.moveTo(this.currentLocation.x, this.currentLocation.y);
      this.cx.lineTo(newLocation.x, newLocation.y);
      this.cx.stroke();

      this.currentLocation = newLocation;
      this.locationList.push(newLocation);
    }

  }

  isNewPath(newLoc: { x: number; y: number }) {
    const idx = this.locationList.findIndex(
      oldLoc => oldLoc.x === newLoc.x && oldLoc.y == newLoc.y
    );
    return idx == -1;
  }

  getDirection() {
    const idx = Math.floor(Math.random() * 4);
    return Direction[idx];
  }

  refresh() {
    this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
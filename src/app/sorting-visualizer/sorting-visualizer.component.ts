import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { getMergeSortAnimations } from '../sorting-algorithms/merge-sort';
import { getQuickSortAnimations } from '../sorting-algorithms/quick-sort';
import { getHeapSortAnimations } from '../sorting-algorithms/heap-sort';
import { getBubbleSortAnimations } from '../sorting-algorithms/bubble-sort';


@Component({
  selector: 'sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.css']
})
export class SortingVisualizerComponent implements OnInit{
  @ViewChildren('arraybar') arraybar: QueryList<ElementRef>;
  title = 'sorting-visualizer';
  array: any[] = [];
  copyArray: any[] = [];

  // Change this value for the speed of the animations.
  ANIMATION_SPEED_MS = 1;

  // Change this value for the number of bars (value) in the array.
  NUMBER_OF_ARRAY_BARS = 250;

  // This is the main color of the array bars.
  PRIMARY_COLOR = 'turquoise';

  // This is the color of array bars that are being compared throughout the animations.
  SECONDARY_COLOR = 'red';

  ngOnInit() {
    this.resetArray();
  }

  resetArray(): void {
    this.array = [];
    for(let i = 0; i < this.NUMBER_OF_ARRAY_BARS; i++) {
      this.array.push(this.randomIntFromIntervals(5, 730));
      this.copyArray[i] = this.array[i];
    }
  }

  // From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  randomIntFromIntervals(min, max): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  mergeSort(): void {
    let animations = getMergeSortAnimations(this.copyArray);

    for(let i = 0; i < animations.length; i++) {
      let isColorChange = i % 3 != 2;
      if(isColorChange) {
        
        let [barOne, barTwo] = animations[i];
        let barOneElement = this.arraybar.filter((element, index) => index == barOne);
        let barTwoElement = this.arraybar.filter((element, index) => index == barTwo);
        let barOneStyle = barOneElement[0].nativeElement.style;
        let barTwoStyle = barTwoElement[0].nativeElement.style;
        let color = i % 3 == 0 ? this.SECONDARY_COLOR : this.PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.ANIMATION_SPEED_MS);
      }
      else {
        setTimeout(() => {
          let [barOne, newHeight] = animations[i];
          this.array[barOne] = newHeight;
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort(): void { 
    let animations = getQuickSortAnimations(this.copyArray);

    for(let i = 0; i < animations.length; i++) {
      let isColorChange = animations[i][2];
      if(isColorChange) {
        // let barOne = animations[i][0];
        // let barTwo = animations[i][1];
        // let barOneElement = this.arraybar.filter((element, index) => index == barOne);
        // let barTwoElement = this.arraybar.filter((element, index) => index == barTwo);
        // let barOneStyle = barOneElement[0].nativeElement.style;
        // let barTwoStyle = barTwoElement[0].nativeElement.style;
        // let color = animations[i][3] === 'first' ? this.SECONDARY_COLOR : this.PRIMARY_COLOR;
        // setTimeout(() => {
        //   barOneStyle.backgroundColor = color;
        //   barTwoStyle.backgroundColor = color;
        // }, i * this.ANIMATION_SPEED_MS);
      }
      else {
        setTimeout(() => {
          let [barOne, newHeight] = animations[i];
          this.array[barOne] = newHeight;
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
  }

  heapSort(): void {
    let animations = getHeapSortAnimations(this.copyArray);
    for(let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        let [barOne, newHeight] = animations[i];
        this.array[barOne] = newHeight;
      }, i * this.ANIMATION_SPEED_MS);
    }
  }

  bubbleSort(): void {
    let animations = getBubbleSortAnimations(this.copyArray);
    for(let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        let [barOne, newHeight] = animations[i];
        this.array[barOne] = newHeight;
      }, i * this.ANIMATION_SPEED_MS);
    }
  }

}

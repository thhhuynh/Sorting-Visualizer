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
  isCurrentlySorting = false;
  isDoneSorting = false;

  // Change this value for the speed of the animations.
  ANIMATION_SPEED_MS = 15;

  // Change this value for the number of bars (value) in the array.
  NUMBER_OF_ARRAY_BARS = 50;

  // This is the main color of the array bars.
  PRIMARY_COLOR = '#eaa19b';

  // This is the color of array bars that are being compared throughout the animations.
  SECONDARY_COLOR = '#d38bb9';

  ngOnInit() {
    this.resetArray();
  }

  resetArray(): void {
    this.array = [];
    this.copyArray = [];
    this.isDoneSorting = false;
    this.isCurrentlySorting = false;
    for(let i = 0; i < this.NUMBER_OF_ARRAY_BARS; i++) {
      this.array.push(this.randomIntFromIntervals(13, 730));
      this.copyArray[i] = this.array[i];
    }
  }

  // From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  randomIntFromIntervals(min, max): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  disableLink(): void {
    return;
  }

  getArraySizeAndSortingSpeed(): string {
    let val = this.NUMBER_OF_ARRAY_BARS;
    if(val <= 10) {
      this.ANIMATION_SPEED_MS = 40;
      return 'class0';
    }
    else if(val <= 25) {
      this.ANIMATION_SPEED_MS = 30;
      return 'class1';
    }
    else if(val <= 40) {
      this.ANIMATION_SPEED_MS = 20;
      return 'class2';
    }
    else if(val <= 65) {
      this.ANIMATION_SPEED_MS = 15;
      return 'class3';
    }
    else if(val <= 85) {
      this.ANIMATION_SPEED_MS = 10;
      return 'class4';
    }
    else {
      this.ANIMATION_SPEED_MS = 7;
      return 'class5';
    }
  }

  mergeSort(): void {
    this.isCurrentlySorting = true;
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
          if(i == animations.length-1) {
            this.isDoneSorting = true;
            this.isCurrentlySorting = false;
          }
        }, i * this.ANIMATION_SPEED_MS);
      }  
    }
  }

  quickSort(): void { 
    this.isCurrentlySorting = true;
    let animations = getQuickSortAnimations(this.copyArray);
    this.sortingAnimation(animations);
  }

  heapSort(): void {
    this.isCurrentlySorting = true;
    let animations = getHeapSortAnimations(this.copyArray);
    this.sortingAnimation(animations);
  }

  bubbleSort(): void {
    this.isCurrentlySorting = true;
    let animations = getBubbleSortAnimations(this.copyArray);
    this.sortingAnimation(animations);
  }

  sortingAnimation(animations: any): void {
    for(let i = 0; i < animations.length; i++) {
      let isColorChange = animations[i][0];
      if(isColorChange) {
        let barOne = animations[i][1];
        let barTwo = animations[i][2];
        let barOneElement = this.arraybar.filter((element, index) => index == barOne);
        let barTwoElement = this.arraybar.filter((element, index) => index == barTwo);
        let barOneStyle = barOneElement[0].nativeElement.style;
        let barTwoStyle = barTwoElement[0].nativeElement.style;
        let color = animations[i][3] === 'first' ? this.SECONDARY_COLOR : this.PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.ANIMATION_SPEED_MS);
      }
      else {
        setTimeout(() => {
          let barOne = animations[i][1];
          let newHeight = animations[i][2];
          this.array[barOne] = newHeight;
          if(i == animations.length-1) {
            this.isDoneSorting = true;
            this.isCurrentlySorting = false;
          }
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
  }

}

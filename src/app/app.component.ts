import { EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { GraphStructure } from './libs/interfaces/GraphStructure';
import { DelayToken } from './libs/interfaces/token';
import { selectionSort } from './libs/sorts/selectionSort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  dataBars: GraphStructure[] = [];
  minimumValueInGraph: number = 5;
  maximumValueInGraph: number = 50;
  maxArraySize = 20;
  message: GraphStructure[] = [];
  maxDelay = 500;
  delayScalingRate = 200;
  delayToken: DelayToken = new DelayToken();



  // https://stackoverflow.com/questions/54352057/map-array-of-object-to-another-array-with-different-object-in-typescript
  receiveMessage($event: string){
    var array = JSON.parse("[" + $event + "]");
    this.dataBars = [];
    this.dataBars = array.map((s: any) => ({value: s}));
  }

  ascendingArray($event: any){
    console.log($event);
    this.dataBars = [];
    this.dataBars = $event.map((s: any) => ({value: s}));
  }

  descendingArray($event: any){
    console.log($event);
    this.dataBars = [];
    this.dataBars = $event.map((s: any) => ({value: s}));
  }
  refreshArray($event: boolean){
    if($event){
      this.initialGraph();
      this.message = Object.assign({}, this.dataBars);
    }
  }

  speedValue($event: any){
    var delay = this.maxDelay * Math.exp(-$event / this.delayScalingRate);
    console.log(delay);
    this.delayToken.set(delay);
  }



  sizeValue($event: any)
  {
    this.maxArraySize = $event;
    this.initialGraph();
  }

  async playAlgorithmSelected($event: any){
    switch($event){
      case 0:
        await selectionSort(this.dataBars, this.delayToken);
        break;
      case 1:
            console.log("Insertion Sort Selected");
            break;
      case 2:
            console.log("Merge Sort Selected");
            break;
      case 3:
            console.log("Quick Sort Selected");
            break;
      case 4:
            console.log("Bubble Sort Selected");
            break;
      case 5:
            console.log("Heap Sort Selected");
            break;
      case 6:
            console.log("Radix Sort Selected");
            break;
      case 7:
            console.log("Bucket Sort Selected");
            break;
      case 8:
            console.log("shell Sort Selected");
            break;
    }
  }

  ngOnInit(): void {
    this.initialGraph();
  }



  initialGraph(){
      this.dataBars = Array(this.maxArraySize)
      .fill(null)
      .map(() => ({value: Math.floor(Math.random() * (this.maximumValueInGraph - this.minimumValueInGraph + 1) + this.minimumValueInGraph), active: false, finalrun: false, swapping: false, iteration: false }));
      this.message = Object.assign({}, this.dataBars);
  }
}

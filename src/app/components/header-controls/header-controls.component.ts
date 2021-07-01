import { ViewChild, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { BehaviorSubject } from 'rxjs';
import { DelayToken } from 'src/app/libs/interfaces/token';
import {GraphStructure, SortingAlg} from '../../libs/interfaces/GraphStructure';

@Component({
  selector: 'app-header-controls',
  templateUrl: './header-controls.component.html',
  styleUrls: ['./header-controls.component.css']
})


export class HeaderControlsComponent implements OnChanges {
  @Input() data!: GraphStructure[];


  @Output() newArrayEvent = new EventEmitter<string>();
  @Output() speedValueEvent = new EventEmitter<number>();
  @Output() sizeValueEvent = new EventEmitter<number>();
  @Output() refreshArrayEvent = new EventEmitter<boolean>();
  @Output() ascendingArrayEvent = new EventEmitter<number[]>();
  @Output() descendingArrayEvent = new EventEmitter<number[]>();
  @Output() playAlgorithmSelectedEvent= new EventEmitter<number>();


  $start = new BehaviorSubject<boolean>(false);
  @ViewChild('arrayList') arrayList!: ElementRef;

  sortAlgorithmSelected: number = 0;
  ascArray:number[] = [39,29,25,20,15];
  refreshClicked: boolean = false;
  valueNew: GraphStructure[] = [];
  maxDelay = 500;
  delayScalingRate = 200;
  delayToken: DelayToken = new DelayToken();


  availableSortingAlg: { name: string, alg: SortingAlg, active: boolean }[] = [
    { name: 'Selection Sort' ,alg: SortingAlg.selectionSort, active: true },
    { name: 'Insertion Sort' ,alg: SortingAlg.insertionSort, active: false },
    { name: 'Merge Sort'     ,alg: SortingAlg.mergeSort,     active: false },
    { name: 'Quick Sort'     ,alg: SortingAlg.quickSort,     active: false },
    { name: 'Bubble Sort'    ,alg: SortingAlg.bubbleSort,    active: false },
    { name: 'Heap Sort'    ,alg: SortingAlg.heapSort,    active: false },
    { name: 'Radix Sort'    ,alg: SortingAlg.radixSort,    active: false },
    { name: 'Bucket Sort'    ,alg: SortingAlg.bucketSort,    active: false },
    { name: 'Shell Sort'    ,alg: SortingAlg.shellSort,    active: false },
  ]

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.valueNew = this.data;
    var dummyArray: number[] = [];
    console.log(this.valueNew);
}


  onSpeedChange(event: MatSliderChange) {
    if(event.value != null) {
      this.speedValueEvent.emit(event.value);
    }
  }

  onSizeChange(event: MatSliderChange){
    if(event.value != null) {
      this.sizeValueEvent.emit(event.value);
    }
  }
  ascendingArray(){
    this.ascArray  = this.ascArray .sort();
    this.ascendingArrayEvent.emit(this.ascArray );
  }

  descendingArray(){
    this.ascArray = this.ascArray.sort();
    this.ascArray.reverse();
    this.descendingArrayEvent.emit(this.ascArray);
  }

  onRefreshClick(){
    this.refreshClicked = true;
    this.refreshArrayEvent.emit(this.refreshClicked);
  }

  onPlayClick(){
    this.playAlgorithmSelectedEvent.emit(this.sortAlgorithmSelected);
  }

  sendMessage(){
      const valueInput = this.arrayList.nativeElement.value;
      this.newArrayEvent.emit(valueInput);
  }

  get sortingAlg() {
    return this.availableSortingAlg.find(q => q.active);
  }

  setSorter(sort: SortingAlg) {
    this.sortAlgorithmSelected = sort;
    this.availableSortingAlg = this.availableSortingAlg.map(q => ({...q, active: q.alg === sort }));
  }

}


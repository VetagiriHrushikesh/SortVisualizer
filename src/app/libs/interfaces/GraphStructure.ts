export * from '../sorts/selectionSort';


export interface GraphStructure{
  value: number;
  active: boolean;
  iteration: boolean;
  swapping: boolean;
  finalrun: boolean;
}


export enum SortingAlg {
  selectionSort = 0,
  insertionSort = 1,
  mergeSort = 2,
  quickSort = 3,
  bubbleSort = 4,
  heapSort = 5,
  radixSort = 6,
  bucketSort = 7,
  shellSort = 8
}

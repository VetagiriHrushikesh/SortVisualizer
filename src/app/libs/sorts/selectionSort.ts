import { GraphStructure } from "../interfaces/GraphStructure";


export async function selectionSort(data:GraphStructure[])
{
  var minimum_index;
  var i;
  for(i = 0; i < data.length-1; i++)
  {
    minimum_index = i;
    var dataFirst = data[minimum_index];
    dataFirst.active = true;

    await new Promise<void>((resolve) =>
    setTimeout(() => {
    resolve();
    }, 300)
    );
    console.log("First Minimum " + data[minimum_index].value)

    var j;
    for(j = i + 1; j <= data.length - 1; j++)
    {
      data[j].iteration = true;
      await new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, 300)
      );
      if(data[j].value < data[minimum_index].value)
      {
        if(minimum_index != i)
        {
          data[minimum_index].iteration = false;
        }
        minimum_index = j;
      }else{
        data[j].iteration = false;
      }
    }
    data[minimum_index].swapping = true;
    data[i].swapping = true;
    await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 700)
    );
    let temp = data[minimum_index].value;
    data[minimum_index].value = data[i].value;
    data[i].value = temp;
    data[minimum_index].swapping = false;
    data[i].swapping = false;
    data[i].finalrun = true;
  }
  data[i].finalrun = true;
}


import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "virtualListIndex"
})
export class VirtualListIndexPipe implements PipeTransform {
  transform(
    array: Array<any>,
    exteraCol: number
  ): number[][] {
    const range = (s: number, e: number) =>
      e > s ? [s, ...range(s + 1, e)] : [s];
    const virtualList = [] as number[][];

    let i = 0;
    for (i; i < array.length - exteraCol; i += exteraCol) {
      virtualList.push([...range(i, i + exteraCol)]);
    }

    // last 2d array maybe not full lenght
    virtualList.push([...range(i, array.length - 1)]);

    return virtualList;
  }
}

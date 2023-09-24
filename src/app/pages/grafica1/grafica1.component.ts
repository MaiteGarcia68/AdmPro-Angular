import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  labels1: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  labels2: string[] = [
    'Download2 Sales',
    'In-Store2 Sales',
    'Mail-Order2 Sales',
  ];

  labels3: string[] = [
    'Download3 Sales',
    'In-Store3 Sales',
    'Mail-Order3 Sales',
  ];

  labels4: string[] = [
    'Download4 Sales',
    'In-Store4 Sales',
    'Mail-Order4 Sales',
  ];

  data1 = [{ data: [350, 450, 100] }]
  data2 = [{ data: [100, 200, 300] }]
  data3 = [{ data: [350, 450, 100] }]
  data4 = [{ data: [350, 450, 100] }]

}

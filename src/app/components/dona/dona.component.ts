import { Component, Input, OnInit } from '@angular/core';

import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {



  // Doughnut
  @Input() title: string = 'Sin Titulo'
  @Input('lables') doughnutChartLabels: string[] = ['Label1', 'Label2', 'Label3'];
  @Input() data: any;

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
    ],
  };

  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit(): void {
    console.log(this.title)
    console.log(this.doughnutChartLabels)
    console.log(this.data)
  }
}

import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, retry, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {



    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('Susc:', valor),
    //   err => console.warn('error', err),
    //   () => console.info('obs terminado')
    // );

    this.intervalSubs = this.retornaItervalo().subscribe( console.log )

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaItervalo(): Observable<number> {

    return interval(100)
                      .pipe(
                        // take: cantidad de emisiones
                        take(10),
                        // map puede cambiar la forma de salida
                        map( valor => valor + 1 ),
                        // Fiter: Lo datos que no cumplen la condicion no pasan
                        filter( valor => ( valor % 2 === 0 ) ),

                        )
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>( observer => {

      const intervalo =  setInterval( () => {
        i ++;
        observer.next(i)
        if (i === 4 ) {
          clearInterval( intervalo)
          // Finalizar observable
          observer.complete();
        }

        if (i === 2 ) {
          observer.error( 'i llego al valor de 2')
        }

      }, 1000)

    });

  }


}

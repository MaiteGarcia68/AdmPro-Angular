import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styleUrls: ['./promesa.component.css']
})
export class PromesaComponent implements OnInit {


  ngOnInit(): void {
    // const promesa = new Promise( ( resolve, reject ) => {
    //   if ( false ) {
    //     resolve('hola mundo')
    //   } else {
    //     reject('Algo salió mal')
    //   }
    // } );

    // promesa.then( ( mensaje ) => {
    //   console.log(mensaje)
    // })
    // .catch( error => console.log('Error en mi promesa'))
    // this.getUsuario();
    this.getUsuario().then( usuarios => {
      console.log('usuarios',usuarios)
    })

    console.log('fin del init')

  }

  getUsuario() {

    return new Promise<[]>((resolve, reject) => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve( body.data ))
    });

  }

}

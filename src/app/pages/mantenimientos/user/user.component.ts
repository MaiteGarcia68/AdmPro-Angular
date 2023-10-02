import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { BusquedaService } from '../../../services/busqueda.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit, OnDestroy{

  public imgSusb: Subscription;

  public totalUser: number = 0;
  public users: User[] = [];
  public usersTpm: User[] = [];
  public page: number = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private busquedaService: BusquedaService,
    private modalImagenService: ModalImagenService
  ) {
    // Importante desuscribir al cerrar la componnente
    this.imgSusb = this.modalImagenService.newImg.subscribe(img => this.loadUser())
  }

  ngOnDestroy(): void {
    this.imgSusb.unsubscribe()
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.loading = true;
    this.userService.loadUser(this.page)
    .subscribe(
      ({ total, users }) => {
        this.totalUser = total;
        this.users = users;
        this.usersTpm = users;
        this.loading = false;
        }
      )
  }

  cambiarPage( valor: number) {
    this.page += valor;
    if ( this.page < 0 ) {
      this.page = 0;
      return;
    }
    if ( this.page >= this.totalUser ) {
      this.page -= valor;
      return;
    }
    this.loadUser();
  }

  find( termBusqueda: string ) {
    if ( termBusqueda.length === 0 ) {
      this.users = this.usersTpm;
    }
    if ( termBusqueda.length >= 3) {
      this.loading = true;
      this.busquedaService.findTable('user',termBusqueda)
        .subscribe( users => {
          this.users = users;
          this.loading = false;
        })
    }
  }

  deleteUser( user: User ) {

    if (this.userService.user!.uid === user.uid) {
      Swal.fire( '¡Eliminar Usuario!', 'NO puedes eliminarte como usuario' , 'question')
      return;
    }
    Swal.fire({
      title: '¿Esta seguro de Eliminar?',
      text: `Esta a punto de eliminar ${user.name} !`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.uid!.toString())
          .subscribe(
            (resp) => {
              this.loadUser();
              Swal.fire(
                'Usuario borrado!', `'¡El usuario  ${user.name} ha sido eliminado!'`, 'success'
              )
            },
            (err) => {
              Swal.fire(
                '¡ NO Eliminado!',
                'err',
                'error'
              )
            }
          )

      }
    })
  }

  updateUser( user: User ) {
    console.log(user)
    this.userService.putUser(user)
      .subscribe(
        (rsp) => {
          console.log(rsp)
        },
        (err: any) => {
          console.log(err)
          Swal.fire(
            'Problema!', `Error: ${ err.error.msg }`, 'error'
          )
        }
      )
  }

  changeImg(user: User) {
    if (user.uid) {
      this.modalImagenService.openModal( 'users', user.uid, user.img );
    }
  }

}

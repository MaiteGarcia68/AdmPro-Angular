import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imgUpload: File | undefined;
  public imgTemp: any = '';

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService,
   ) {}

  closeModal() {
    this.imgTemp = null;
    this.modalImagenService.closeModal()
  }

  changeImg( file: File ) {
    this.imgUpload = file;
    if (!file) {
      this.imgTemp = '';
      return
    };

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  fileUpload() {

    const uid = this.modalImagenService.uid;
    const table = this.modalImagenService.table;

    if ( this.imgUpload && table && uid ) {
      this.fileUploadService.uploadImg( this.imgUpload, table, uid)
      .subscribe(
        (rsp: any) => {
          if ( rsp.ok ) {
            this.modalImagenService.newImg.emit(rsp.img)
            Swal.fire('Guardado', 'Imagen guardada correctamente', 'success')
          }
        },
        (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error')
        }
      )
    }
    this.modalImagenService.closeModal()

  }


}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user: User;
  public imgUpload: File | undefined;
  public imgTemp: any = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user!;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [ this.user?.name, Validators.required],
      email: [ this.user?.email, [Validators.required, Validators.email ]],
    })

  }

  updateProfile() {

    if (this.profileForm) {
      this.userService.putProfile(this.profileForm.value)
        .subscribe(
          (rsp) => {
            const { name, email } = this.profileForm.value;
            this.user.name = name;
            this.user.email = email;
            Swal.fire('Guardado', 'Cambios fueron guardados', 'success')
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error')
          }
        );
    }
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

    if ( this.imgUpload ) {
      this.fileUploadService.uploadImg( this.imgUpload, 'users', this.user.uid ||'')
      .subscribe(
        (rsp: any) => {
          if ( rsp.ok ) {
            this.user.img = rsp.nombreArchivo;
            Swal.fire('Guardado', 'Imagen guardada correctamente', 'success')
          }
        },
        (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error')
        }
      )}

  }

}

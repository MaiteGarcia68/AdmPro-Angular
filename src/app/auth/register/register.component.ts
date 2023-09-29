import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSumitted = false;

  public registerForm = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required]],
    password2: ['', [ Validators.required]],
    terms: [false, [ Validators.required]],
  }, {
    Validators: this.passwordsIguales( 'password', 'password2')
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    ) {}

  newUser() {
    this.formSumitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      console.warn('Formulacio inválido')
      return
    };

    // Crear el usuario
    this.userService.newUser( this.registerForm.value )
      .subscribe(
        (resp) => {
          console.log(resp);
           // Navegar al /
           this.router.navigateByUrl('/')
          },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error')
      })
  }

  fieldNotValid( field: string ): boolean {

    return ( this.registerForm.get(field)?.invalid && this.formSumitted ) || false
  }

  passwordsNoValid() {

    // TODO: NO controla bien las contraseñs iguales
    return ( (this.registerForm.get('password')?.value !== this.registerForm.get('password2')?.value)
        && this.formSumitted )
  }

  aceptaTerms():boolean {

    if ( !this.registerForm.get('terms')?.value && this.formSumitted ) {
      return true;
    }
    return false
  }

  passwordsIguales( password: string, password2: string) {
    return ( FormGroup: FormGroup ) => {
        const pass1Control = FormGroup.get(password);
        const pass2Control = FormGroup.get(password2);

        if ( pass1Control?.value === pass2Control?.value) {
          pass2Control?.setErrors(null)
        } else {
          pass2Control?.setErrors({ noEsIgual: true})
        }
    }
  }

}

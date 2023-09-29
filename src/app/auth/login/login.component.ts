import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const google: any;
import { environment } from 'src/environments/enviroment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    this.googleInit()
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: environment.google_id,
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    this.userService.loginGoogle(response.credential)
      .subscribe(
        (resp) => {
          // Navegar al /
          this.ngZone.run(() => {
            this.router.navigateByUrl('/')
          })
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error')
        })
  }

  login() {


    if ( this.loginForm.valid) {

      this.userService.login( this.loginForm.value )
      .subscribe(
        (resp) => {
          if (this.loginForm.get('rememberMe')?.value) {
            const pass = this.loginForm.get('email')!.value;
            localStorage.setItem('email', pass!)
          } else {
            localStorage.removeItem('email')
          }
          this.router.navigateByUrl('/')
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error')
        })

    }
  }

}

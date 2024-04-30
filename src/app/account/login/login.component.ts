import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'


// Login Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { first } from 'rxjs/operators';
import { ToastService } from './toast-service';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();
  name= '';

  constructor(private formBuilder: UntypedFormBuilder, private authenticationService: AuthenticationService, private router: Router,
    public toastr: ToastrService,
    private route: ActivatedRoute, public toastService: ToastService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      nik: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;


    // Login Api
    this.authenticationService.login(this.f['nik'].value, this.f['password'].value).subscribe((data: any) => {
      if (data.message == 'Login success') {
        localStorage.setItem('toast', 'true');
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        console.log(data)
        localStorage.setItem('token', data.token);
        this.name= data.user.nama;
        console.log(this.name)
        this.howSuccess();
        this.router.navigate(['/']);
      } else {
        // this.toastService.show(data.data, { classname: 'bg-danger text-white', delay: 15000 });
      }
    })

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  howSuccess() {
    this.toastr.success('HELLO ' + this.name + '!', 'Login Success', {
      timeOut: 3000,
    })
  }
  showError() {
    this.toastr.error('Oops! something wrong!', 'Login Failed', {
      timeOut: 3000,
    })
  }
  showInfo() {
    this.toastr.info('everything is broken', 'Major Error', {
      timeOut: 3000,
    })
  }
  showWarning() {
    this.toastr.warning('Oops! It seems there was an issue with your NIK or password!', 'Login Failed', {
      timeOut: 3000,
    })
  }
  // this.name
  // .login(this.f['nik'].value, this.f['password'].value)
  // .subscribe(
  //   (data: any) => {
  //     this.name = data.user[0].lg_name;
  //     localStorage.setItem('nikLogged', this.f['nik'].value)
  //     this.authService.saveToken(data.access_token);
  //     this.authService.saveUser(data.user);
  //     this.showSuccess()
  //     if (this.maissy == true) {
  //       this.reloadPage();
  //     } else if (this.am == true) {
  //       this.reloadPageAm();
  //     }

  //   },
  //   (err: { statusText: string; }) => {
  //     if (err.statusText == 'Unauthorized') {
  //       this.showWarning()
  //       '<div class="alert success-alert" ><h3>Success Alert Message < /h3>< a class="close" >& times; </a> < /div>'
  //     } else {
  //       this.showError()
  //     }
  //     this.submitted = false;
  //     this.f['password'].setValue('');
  //   },
  //   () => {
  //     this.submitted = false;
  //   }
  // );
}

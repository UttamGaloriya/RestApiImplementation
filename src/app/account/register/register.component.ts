import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  seasons: string[] = ['Male', 'Female', 'Other'];
  form!: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(private fb: FormBuilder, private userServices: UserService, private alert: AlertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, this.validateInput]],
      lastName: ['', [Validators.required, this.validateInput]],
      gender: ['', [Validators.required,]],
      username: ['', [Validators.required, this.validateUser]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]

    })
  }



  validateInput(control: FormControl) {
    const trimmedValue = control.value.trim();
    if (trimmedValue === '') {
      return { spacesOnly: true };
    }
    if (!/^[a-zA-Z]+$/.test(trimmedValue)) {
      return { invalidInput: true };
    }
    if (trimmedValue !== control.value) {
      control.setValue(trimmedValue);
    }
    return null;
  }
  validateUser(control: FormControl) {
    const trimmedValue = control.value.trim();
    if (trimmedValue === '') {
      return { spacesOnly: true };
    }
    if (!/^[a-zA-Z0-9]+$/.test(trimmedValue)) {
      return { invalidInput: true };
    }
    if (trimmedValue !== control.value) {
      control.setValue(trimmedValue);
    }
    return null;
  }

  get f(): { [key: string]: AbstractControl } { return this.form.controls; }



  onSubmit() {
    this.userServices.postData(this.form.value).subscribe(
      (data: any) => { console.log(data), this.alert.showNotification("congratulations", "ok", "success"), this.router.navigateByUrl('/account/login') },
      (error: any) => { console.log(error) },
      () => console.log('HTTP request completed.')
    )
  }
}


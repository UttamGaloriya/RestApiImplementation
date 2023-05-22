import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  hide: boolean = true;
  Id: number = -1
  seasons: string[] = ['Male', 'Female', 'Other'];
  form!: FormGroup;
  userData: any;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(private fb: FormBuilder, private userServices: UserService, private alert: AlertService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((res) => {
      this.Id = res['id'];
    });

  }

  ngOnInit(): void {
    this.userServices.getUserData(this.Id).subscribe((data) => { this.userData = data, console.log(data), console.log(this.userData.firstName) })



    this.form = this.fb.group({
      firstName: [this.userData.firstName, [Validators.required, this.validateInput]],
      lastName: [this.userData.lastName, [Validators.required, this.validateInput]],
      gender: [this.userData.gender, [Validators.required,]],
      username: [this.userData.username, [Validators.required, this.validateUser]],
      email: [this.userData.email, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [this.userData.password, [Validators.required, Validators.minLength(8), Validators.maxLength(40), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]

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
    if (!/^[a-zA-Z][0-9]]+$/.test(trimmedValue)) {
      return { invalidInput: true };
    }
    if (trimmedValue !== control.value) {
      control.setValue(trimmedValue);
    }
    return null;
  }

  get f(): { [key: string]: AbstractControl } { return this.form.controls; }

  onSubmit() { }
}

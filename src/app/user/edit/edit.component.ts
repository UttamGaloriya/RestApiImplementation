import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/_services/user.service';
import { userObj } from 'src/app/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  hide: boolean = true;
  Id: number = -1
  seasons: string[] = ['male', 'female', 'other'];
  form!: FormGroup;
  UserData: userObj | null = null
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  readonly data$ = this.userServices.getUserData(1);


  constructor(private fb: FormBuilder, private userServices: UserService, private alert: AlertService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((res) => {
      this.Id = res['id'];
    });

  }

  ngOnInit(): void {
    this.getUserData(this.Id);
  }

  getUserData(id: number): void {
    this.userServices.getUserData(id).subscribe((data) => {
      // Create InterFace for Data response
      this.setUserFormData(data);


      // Second Way if data is used out of form then
      // this.someData = data;
      // this.setUserFormData();
    })
  }

  setUserFormData(data: any): void {
    this.form = this.fb.group({
      firstName: [data.firstName, [Validators.required, this.validateInput]],
      lastName: [data.lastName, [Validators.required, this.validateInput]],
      gender: [data.gender, [Validators.required,]],
      username: [data.username, [Validators.required, this.validateUser]],
      email: [data.email, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [data.password, [Validators.required, Validators.minLength(6),
      Validators.maxLength(40),
        //  Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      ]]
    });
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
    this.userServices.updateData(this.form.value, this.Id).subscribe(
      (data: any) => { this.alert.showNotification("congratulations", "ok", "success") },
      (error: any) => { this.alert.showNotification("something wrong", "ok", "error") },
      () => { this.router.navigateByUrl('/user/table') }

    )
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';
  loginPath = `/login`;
  load = false;

  constructor(
    formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  registerUser() {
    this.load = true;
    this.error = '';
    const { email, password, name } = this.registerForm.value;
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (usr) => {
        await usr.user.updateProfile({ displayName: name });
        this.load = false;
        this.router.navigate(['home']);
      })
      .catch(({ message }) => {
        this.load = false;
        this.error = message;
      });
  }

  getError(control: AbstractControl) {
    if (control.hasError('email')) {
      return 'Email invalid';
    } else if (control.hasError('required')) {
      return 'This field is required';
    } else if (control.hasError('minlength')) {
      return `The min character of the password is ${control.errors.minlength.requiredLength}`;
    } else {
      return 'Any error';
    }
  }
}

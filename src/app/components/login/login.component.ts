import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constador = 10;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  goToLogin() {
    this.error = '';
    const { pass, email } = this.loginForm.value;
    this.afAuth
      .signInWithEmailAndPassword(email, pass)
      .then((user) => {
        this.router.navigate(['home']);
      })
      .catch(({ message }) => {
        this.error = message;
      });
  }
}

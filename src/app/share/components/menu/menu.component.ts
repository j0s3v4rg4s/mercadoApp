import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth, private route: Router) {}

  ngOnInit(): void {}

  logout() {
    this.afAuth.signOut().then(() => {
      this.route.navigate(['/login']);
    });
  }
}

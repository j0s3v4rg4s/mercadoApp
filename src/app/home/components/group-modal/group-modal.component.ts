import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss'],
})
export class GroupModalComponent implements OnInit {
  nameGroup: string;
  codeGroup: string;
  loadAdd = false;
  error2: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  createGroup() {
    this.loadAdd = true;
    this.afAuth.user.pipe(take(1)).subscribe(async (user) => {
      const random = await this.generateNodeGroup(this.nameGroup, user.uid);
      await this.addGroupToUser(random, user.uid);
      this.nameGroup = null;
      this.loadAdd = false;
    });
  }

  joinGroup() {
    this.loadAdd = true;
    this.error2 = null;
    const $group = this.db
      .object(`group/${this.codeGroup}`)
      .valueChanges()
      .pipe(take(1));
    // existe el grupo
    $group
      .pipe(
        filter((data) => !!data),
        switchMap(() => this.afAuth.user.pipe(take(1)))
      )
      .subscribe(async (user) => {
        await this.db.object(`user/${user.uid}/groups`).update({
          [this.codeGroup]: true,
        });
        this.loadAdd = false;
      });
    // no se encuentra
    $group.pipe(filter((data) => !data)).subscribe(() => {
      this.error2 = `El grupo con el id ${this.codeGroup} no se encontró`;
      this.loadAdd = false;
    });
  }

  async generateNodeGroup(name: string, uid: string) {
    const random = Math.floor(Math.random() * 1000000);
    await this.db.object(`group/${random}/`).set({
      uid: random,
      persons: {
        [uid]: true,
      },
      name,
    });
    return random;
  }

  async addGroupToUser(uidGroup: number, uid: string) {
    await this.db.object(`user/${uid}/groups`).update({
      [uidGroup]: true,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupModalComponent } from '../group-modal/group-modal.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog() {
    this.dialog.open(GroupModalComponent);
  }
}

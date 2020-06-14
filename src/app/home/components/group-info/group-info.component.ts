import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { GroupModel } from '../../../core/models/group.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { ProductModel } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss'],
})
export class GroupInfoComponent implements OnInit, OnDestroy {
  group: GroupModel;
  subscribe: Subscription;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private dialog: MatDialog
  ) {
    this.subscribe = this.route.params
      .pipe(
        take(1),
        map((data) => data['id']),
        switchMap((id) =>
          this.db.object<GroupModel>(`group/${id}`).valueChanges()
        ),
        map((data) => ({
          ...data,
          products: data.products ? Object.values(data.products) : [],
        }))
      )
      .subscribe((data) => (this.group = data));
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  openModal() {
    this.dialog.open(AddProductModalComponent, { data: this.group.uid });
  }

  ngOnInit(): void {}

  async addElement(product: ProductModel) {
    const ref = this.db.database.ref(
      `group/${this.group.uid}/products/${product.uid}`
    );
    await ref.transaction((productUpdate: ProductModel) => {
      if (!!productUpdate) {
        productUpdate.quantity++;
      }
      return productUpdate;
    });
  }

  async removeElement(product: ProductModel) {
    const ref = this.db.database.ref(
      `group/${this.group.uid}/products/${product.uid}`
    );
    await ref.transaction((productUpdate: ProductModel) => {
      if (!!productUpdate && productUpdate.quantity > 0) {
        productUpdate.quantity--;
      }
      return productUpdate;
    });
  }
}

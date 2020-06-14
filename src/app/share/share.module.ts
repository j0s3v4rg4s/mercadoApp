import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './components/menu/menu.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [LayoutComponent, ProductComponent, MenuComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [LayoutComponent, ProductComponent],
})
export class ShareModule {}

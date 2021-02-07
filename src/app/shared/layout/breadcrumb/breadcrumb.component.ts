import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  home: MenuItem = {};
  isBasePath = false;

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: 'admin' };
  }

  voltar(): void {
    this.isBasePath = this.router.isActive('/admin', true);
    if (this.isBasePath) return;
    void this.location.back();
  }
}

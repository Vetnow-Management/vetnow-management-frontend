import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarService } from '../../service/sidebar.service';
import { filter } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-sidebar-item]',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent implements OnInit, OnDestroy {
  @Input() item: any;

  @Input() index: number = 0;

  @Input() root: boolean = false;

  @Input() parentKey?: string = '';

  active = false;

  menuSourceSubscription: Subscription;

  menuResetSubscription: Subscription;

  key = '';

  constructor(public router: Router, private cd: ChangeDetectorRef, private sidebarService: SidebarService) {
    this.menuSourceSubscription = this.sidebarService.menuSource$.subscribe((key) => {
      // deactivate current active menu
      if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
        this.active = false;
      }
    });

    this.menuResetSubscription = this.sidebarService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((params) => {
      if (this.item.routerLink) {
        this.updateActiveStateFromRoute();
      } else {
        this.active = false;
      }
    });
  }

  ngOnInit() {
    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }

    this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
  }

  updateActiveStateFromRoute() {
    this.active = this.router.isActive(this.item.routerLink[0], this.item.items ? false : true);
  }

  // @ts-ignore
  itemClick(event: Event): true | undefined {
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return true;
    }

    // notify other items
    this.sidebarService.onMenuStateChange(this.key);

    // execute command
    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;
    } else {
      // activate item
      this.active = true;

      // hide overlay menus
      this.sidebarService.menuActiveMobile = false;
    }
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
}

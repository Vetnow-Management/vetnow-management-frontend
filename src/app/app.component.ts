import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationService } from './_services/authentication.service';
import { Observable } from 'rxjs';
import { SidebarService } from './shared/layout/sidebar/service/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  isLogado: Observable<boolean> = new Observable<boolean>();

  topMenuActive = false;

  topMenuLeaving = false;

  topMenuButtonClick = false;

  configActive = false;

  configClick = false;

  inputStyle = 'outlined';

  ripple = false;

  documentClickListener: () => void = () => null;

  constructor(
    public renderer: Renderer2,
    private primengConfig: PrimeNGConfig,
    public sidebarService: SidebarService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.isLogado = this.authenticationService.isLoggedIn;
  }

  ngAfterViewInit() {
    this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
      if (!this.isDesktop()) {
        if (!this.sidebarService.menuClick) {
          this.sidebarService.menuActiveMobile = false;
        }

        if (!this.topMenuButtonClick) {
          this.hideTopMenu();
        }
      }

      if (this.configActive && !this.configClick) {
        this.configActive = false;
      }

      this.configClick = false;
      this.sidebarService.menuClick = false;
      this.topMenuButtonClick = false;
    });
  }

  toggleMenu(event: Event) {
    this.sidebarService.menuClick = true;
    if (this.isDesktop()) {
      this.sidebarService.menuInactiveDesktop = !this.sidebarService.menuInactiveDesktop;
      if (this.sidebarService.menuInactiveDesktop) {
        this.sidebarService.menuActiveMobile = false;
      }
    } else {
      this.sidebarService.menuActiveMobile = !this.sidebarService.menuActiveMobile;
      if (this.sidebarService.menuActiveMobile) {
        this.sidebarService.menuInactiveDesktop = false;
      }
    }

    if (this.topMenuActive) {
      this.hideTopMenu();
    }

    event.preventDefault();
  }

  toggleTopMenu(event: Event) {
    this.topMenuButtonClick = true;
    this.sidebarService.menuActiveMobile = false;

    if (this.topMenuActive) {
      this.hideTopMenu();
    } else {
      this.topMenuActive = true;
    }

    event.preventDefault();
  }

  hideTopMenu() {
    this.topMenuLeaving = true;
    setTimeout(() => {
      this.topMenuActive = false;
      this.topMenuLeaving = false;
    }, 500);
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }
}

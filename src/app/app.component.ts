import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { AuthenticationService } from './services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  isLogado: Observable<boolean> = new Observable<boolean>();

  menuInactiveDesktop = false;

  menuActiveMobile = false;

  topMenuActive = false;

  topMenuLeaving = false;

  topMenuButtonClick = false;

  configActive = false;

  configClick = false;

  inputStyle = 'outlined';

  ripple = false;

  documentClickListener: () => void = () => null;

  // @ts-ignore
  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;

  constructor(
    public renderer: Renderer2,
    private primengConfig: PrimeNGConfig,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.isLogado = this.authenticationService.isLoggedIn;
  }

  ngAfterViewInit() {
    this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
      if (!this.isDesktop()) {
        if (!this.sidebarComponent.menuClick) {
          this.menuActiveMobile = false;
        }

        if (!this.topMenuButtonClick) {
          this.hideTopMenu();
        }
      }

      if (this.configActive && !this.configClick) {
        this.configActive = false;
      }

      this.configClick = false;
      this.sidebarComponent.menuClick = false;
      this.topMenuButtonClick = false;
    });
  }

  toggleMenu(event: Event) {
    this.sidebarComponent.menuClick = true;
    if (this.isDesktop()) {
      this.menuInactiveDesktop = !this.menuInactiveDesktop;
      if (this.menuInactiveDesktop) {
        this.menuActiveMobile = false;
      }
    } else {
      this.menuActiveMobile = !this.menuActiveMobile;
      if (this.menuActiveMobile) {
        this.menuInactiveDesktop = false;
      }
    }

    if (this.topMenuActive) {
      this.hideTopMenu();
    }

    event.preventDefault();
  }

  toggleTopMenu(event: Event) {
    this.topMenuButtonClick = true;
    this.menuActiveMobile = false;

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

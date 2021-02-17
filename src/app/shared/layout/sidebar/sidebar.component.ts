import { Component, OnInit } from '@angular/core';
// @ts-ignore bug na importacao
import { faTachometerAlt, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router } from '@angular/router';
import { SidebarService } from './service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  model: any[] = [];
  profileActive = false;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.model = [
      { label: 'Dashboard', icon: faTachometerAlt, routerLink: ['admin'] },
      { label: 'Tutor', icon: faUserTie, routerLink: ['admin', 'tutor'] },
      // { label: 'Consulta', icon: faUserNurse, routerLink: ['admin', 'consulta'] },
    ];
  }

  onMenuClick() {
    this.sidebarService.menuClick = true;
  }

  sair() {
    this.authenticationService.logout();
    void this.router.navigate(['']);
  }
}

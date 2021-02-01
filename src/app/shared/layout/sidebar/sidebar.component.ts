import { Component, OnInit } from '@angular/core';
// @ts-ignore bug na importacao
import { faPaw, faUserTie, faTachometerAlt, faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { SidebarService } from './service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  faPaw = faPaw;
  faUserTie = faUserTie;
  faUserNurse = faUserNurse;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  faTachometerAlt = faTachometerAlt;

  profileActive = false;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  toggleProfile(event: Event) {
    this.profileActive = !this.profileActive;
    event.preventDefault();
  }

  onMenuClick() {
    this.sidebarService.menuClick = true;
  }

  sair() {
    this.authenticationService.logout();
    void this.router.navigate(['']);
  }
}

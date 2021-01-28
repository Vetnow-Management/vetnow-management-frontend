import { Component, OnInit } from '@angular/core';
import { faPaw, faUserTie, faTachometerAlt, faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  faPaw = faPaw;
  faUserTie = faUserTie;
  faUserNurse = faUserNurse;
  faTachometerAlt = faTachometerAlt;

  menuClick = false;
  profileActive = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  toggleProfile(event: Event) {
    this.profileActive = !this.profileActive;
    event.preventDefault();
  }

  onMenuClick() {
    this.menuClick = true;
  }

  sair() {
    this.authenticationService.logout();
    void this.router.navigate(['']);
  }
}

import { Component, OnInit } from '@angular/core';
import { faPaw, faUserTie, faTachometerAlt, faUserNurse } from '@fortawesome/free-solid-svg-icons';

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

  constructor() {}

  ngOnInit(): void {}

  toggleProfile(event: Event) {
    this.profileActive = !this.profileActive;
    event.preventDefault();
  }

  onMenuClick() {
    this.menuClick = true;
  }
}

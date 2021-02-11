import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss'],
})
export class TutorComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  cadastrar(): void {
    void this.router.navigate(['admin', 'tutor', 'cadastro']);
  }
}

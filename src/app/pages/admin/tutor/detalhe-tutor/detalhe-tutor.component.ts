import { Component, OnInit } from '@angular/core';
import { TutorService } from '../service/tutor.service';
import { ITutor } from '../model/ITutor';

@Component({
  selector: 'app-detalhe-tutor',
  templateUrl: './detalhe-tutor.component.html',
  styleUrls: ['./detalhe-tutor.component.scss'],
})
export class DetalheTutorComponent implements OnInit {
  public tutorDetalhe: ITutor = {};

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.tutorDetalhe = this.tutorService.detalheTutorAtual();
  }
}

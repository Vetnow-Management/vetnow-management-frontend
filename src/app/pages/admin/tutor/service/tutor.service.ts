import { Injectable, OnInit } from '@angular/core';
import { ITutor } from '../model/ITutor';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TutorService implements OnInit {
  private id?: string;
  public tutorDetalhe?: ITutor;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id as string;
  }

  detalheTutorAtual(): ITutor {
    const tutor = this.tutorDetalhe ?? null;
    if (tutor) {
      return tutor;
    }
    return this.buscarTutor();
  }

  private buscarTutor(): ITutor {
    return {}; // todo buscar no servico
  }
}

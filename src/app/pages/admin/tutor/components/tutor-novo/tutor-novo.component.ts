import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CepService } from '../../../../../services/cep.service';

@Component({
  selector: 'app-tutor-novo',
  templateUrl: './tutor-novo.component.html',
  styleUrls: ['./tutor-novo.component.scss'],
})
export class TutorNovoComponent implements OnInit {
  constructor(private cepService: CepService) {}

  ngOnInit(): void {}

  salvar(tutorForm: FormGroup) {}
}

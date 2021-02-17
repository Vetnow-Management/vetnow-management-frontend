export interface IAnimal {
  id?: string;
  idTutor?: string;
  nome?: string;
  cor?: string;
  dtNascimento?: Date;
  peso?: number;
  sexo?: Sexo;
  falecido?: boolean;
  especie?: string;
  raca?: string;
  cliente?: string;
  observacao?: string;
}

export enum Sexo {
  MACHO = 'MACHO',
  FEMEA = 'FEMEA',
}

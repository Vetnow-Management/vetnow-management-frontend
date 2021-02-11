export interface IAnimal {
  id?: string;
  nome?: string;
  cor?: string;
  dtNascimento?: string;
  peso?: number;
  sexo?: ISexo;
  falecido?: boolean;
  especie?: string;
  raca?: string;
  cliente?: string;
  observacao?: string;
}

enum ISexo {
  MACHO,
  FEMEA,
}

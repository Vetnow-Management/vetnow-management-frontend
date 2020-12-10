import Cliente from "./Cliente";

export default interface Animal {
  uuid: string;
  nome: string;
  cor: string;
  dtNascimento: Date;
  peso: number;
  sexo: string; //todo passar pra enum
  observacao: string;
  falecido: boolean;
  especie: string; //todo passar pra enum
  raca: string; // todo passa pra enum
  tutor: Cliente;
}

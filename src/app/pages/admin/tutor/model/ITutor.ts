export interface ITutor {
  id?: string;
  nome?: string;
  dataNascimento?: string;
  documento?: string;
  endereco?: IEndereco;
  contato?: IContato;
}

interface IEndereco {
  id?: string;
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  unidade?: string;
}

interface IContato {
  id?: string;
  email?: string;
  celular?: string;
  telefone?: string;
}

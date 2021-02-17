export interface ITutor {
  id?: string;
  nome?: string;
  dtNascimento?: string;
  documento?: string;
  tipo?: string;
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

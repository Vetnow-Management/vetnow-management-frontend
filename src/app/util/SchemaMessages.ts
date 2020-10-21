const SchemaMessages = {
  required: 'Campo Obrigatório',
  cpf: 'CPF inválido',
  cnpj: 'CNPJ inválido',
  email: 'E-mail inválido',
  min: (value: number) => `Mínimo de ${value} caracteres`,
  max: (value: number) => `Máximo de ${value} caracteres`,
}

export default SchemaMessages;

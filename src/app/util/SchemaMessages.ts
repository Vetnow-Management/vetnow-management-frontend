const SchemaMessages = {
  required: 'Campo Obrigatório',
  cpf: 'CPF inválido',
  email: 'E-mail inválido',
  min: (value: number) => `Mínimo de ${value} letras`,
  max: (value: number) => `Máximo de ${value} letras`,
}

export default SchemaMessages;

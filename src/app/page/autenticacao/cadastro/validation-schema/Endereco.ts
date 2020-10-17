import * as yup from 'yup';

import { SchemaMessages } from '../../../../util';

const {
  required,
} = SchemaMessages;

const EnderecoValidationSchema = yup.object().shape({
  cep: yup
    .string()
    .required(required)
    .trim()
    .length(9, 'Tamanho do CEP inválido'),
  logradouro: yup.string().required(required),
  bairro: yup.string().required(required),
  localidade: yup.string().required(required),
  uf: yup.string().required(required),
});

export default EnderecoValidationSchema;

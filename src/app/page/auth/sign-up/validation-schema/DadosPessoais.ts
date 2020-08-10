import * as yup from 'yup';
import { addDays } from "date-fns";
import { Validation } from '@vetnow-management/essentials';

import { SchemaMessages } from '../../../../util';
import ContatoValidationSchema from './Contato';
import EnderecoValidationSchema from './Endereco';

const {
  cpf,
  max,
  min,
  required,
} = SchemaMessages;

const CURRENT_DATE = new Date();

const DadosPessoaisValidationSchema = yup.object({
  nome: yup
    .string()
    .required(required)
    .trim()
    .min(5, min(5))
    .max(50, max(5)),
  dtNascimento: yup
    .date()
    .required(required)
    .max(addDays(CURRENT_DATE, 1), 'Data nao pode passar de hoje'),
  documento: yup
    .string()
    .required(required)
    .test(
      'cpf',
      cpf,
      Validation.isCPF,
    ),
  tipoPessoa: yup.string().required(),
  contato: ContatoValidationSchema.defined(),
  endereco: EnderecoValidationSchema.defined(),
}).defined()

export default DadosPessoaisValidationSchema;

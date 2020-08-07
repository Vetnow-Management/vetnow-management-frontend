import * as yup from 'yup';
import { addDays } from 'date-fns'
import { Validation } from '@cade-tecnologia/essentials';

const CURRENT_DATE = new Date();

const EnderoSchema = yup.object().shape({
  cep: yup.string().required().trim(),
  logradouro: yup.string().required(),
});

const ContatoSchema = yup.object().shape({
  celular: yup.string().required().trim(),
  telefone: yup.string().trim(),
});

export const DadosPessoaisSchema = yup.object({
  nome: yup
    .string()
    .required('Campo Obrigatorio')
    .trim()
    .min(5, 'Mínimo de 5 letras')
    .max(50, 'Máximo de 50 letras'),
  dtNascimento: yup
    .date()
    .required('Campo Obrigatorio')
    .max(addDays(CURRENT_DATE, 1), 'Data nao pode passar de hoje'),
  documento: yup
    .string()
    .required('Campo Obrigatorio'),
  // .test(
  //   'cpf',
  //   'CPF invalido',
  //   Validation.isCPF,
  // ),
  contato: ContatoSchema.defined(),
  endereco: EnderoSchema.defined(),
}).defined()

export const DadosEmpresariaisSchema = yup.object().shape({
  empresa: yup.object().shape({
    razaoSocial: yup.string().required().trim(),
    documento: yup.string().required().trim(),
    contato: ContatoSchema.defined(),
    endereco: EnderoSchema.defined(),
  }).defined(),
}).defined()

export const DadosUsuarioSchema = yup.object().shape({
  usuario: yup.object().shape({
    usuario: yup.string().required().trim(),
    senha: yup.string().required().trim(),
  })
})

export type ICadastro = yup.InferType<typeof DadosPessoaisSchema>

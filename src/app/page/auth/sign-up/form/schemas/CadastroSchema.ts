import * as yup from 'yup';
import { addDays } from 'date-fns'
import { CellPhoneNumberCustomMessage, Validation, Verify } from '@cade-tecnologia/essentials';

import { SchemaMessages } from '../../../../../util';

const {
  cpf,
  max,
  min,
  required,
  email,
} = SchemaMessages;

const CURRENT_DATE = new Date();

const phoneValidationCustomMessage: CellPhoneNumberCustomMessage = {
  whenPhoneNumberIsInvalid: 'Celular inválido',
  whenStartingWithNineIsInvalid: 'Deve Começar com 9',
  whenDDDIsInvalid: 'DDD inválido',
  whenDDIIsInvalid: 'DDI inválido',
}

const EnderoSchema = yup.object().shape({
  cep: yup.string().required().trim(),
  logradouro: yup.string().required(),
});

const ContatoSchema = yup.object().shape({
  celular: yup
    .string()
    .required(required)
    .trim()
    .test(
      'celular',
      'Celular inválido',
      function (value: string | undefined) {
        // @ts-ignore: n sei pq ts reclama
        if (value?.length < 15) return false;

        const validation = Validation.cellPhoneNumber(
          value,
          {
            withDDD: true,
            startingWithNine: true,
            useCustomMessage: phoneValidationCustomMessage,
          },
        ) as string[];
        return Verify.isNotEmpty(validation)
          ? this.createError({message: validation[0]})
          : true;
      },
    ),
  telefone: yup
    .string()
    .trim()
    .test(
      'telefone',
      'Telefone inválido',
      function (value: string | undefined) {
        if (Verify.isBlank(value)) return true;
        // @ts-ignore: n sei pq ts reclama
        if (value?.length < 14) return false;

        const validation = Validation.cellPhoneNumber(
          value,
          {
            withDDD: true,
            useCustomMessage: {
              ...phoneValidationCustomMessage,
              whenPhoneNumberIsInvalid: 'Telefone inválido',
            },
          },
        ) as string[];
        return Verify.isNotEmpty(validation)
          ? this.createError({message: validation[0]})
          : true;
      },
    ),
  email: yup
    .string()
    .required(required)
    .email(email)
});

export const DadosPessoaisSchema = yup.object({
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

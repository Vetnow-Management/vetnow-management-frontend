import * as yup from 'yup';

import {debounce} from 'lodash-es';
import {CellPhoneNumberCustomMessage, Validation, Verify} from '@vetnow-management/essentials';
import {SchemaMessages} from '../../../../util';
import {ValidacaoRestService} from "../../../../service/validacao";

const {
  required,
  email,
} = SchemaMessages;

const phoneValidationCustomMessage: CellPhoneNumberCustomMessage = {
  whenPhoneNumberIsInvalid: 'Celular inválido',
  whenStartingWithNineIsInvalid: 'Deve Começar com 9',
  whenDDDIsInvalid: 'DDD inválido',
  whenDDIIsInvalid: 'DDI inválido',
}

const ContatoValidationSchema = yup.object().shape({
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
        if (value!.length < 14) return false;

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
    // fixme: ta fazendo request quando preenche outro campo
    // o endpoint ta pedindo Authorization ai da 401
    // .test(
    //   'email',
    //   'E-mail ja cadastrado', (email: string): Promise<boolean> => {
    //     const validacaoResquest = async (item: string, resolve: any) =>
    //       await ValidacaoRestService.validarInformacoes({email}).toPromise()
    //         .then(res => resolve(res.emailValido))
    //         .catch(() => resolve(false))
    //     return executeWithDebounce(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, email as string, validacaoResquest)
    //   }
    // )
});

function executeWithDebounce(regex: RegExp, valor: string, validation: (valor: string, resolve: any) => Promise<void>): Promise<boolean> {
  if (regex.test(valor)) {
    return new Promise(resolve => debounce(validation, 1000)(valor, resolve))
  }
  return Promise.reject(true);
}

export default ContatoValidationSchema;

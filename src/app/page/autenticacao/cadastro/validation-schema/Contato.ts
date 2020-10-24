import * as yup from 'yup';

import { CellPhoneNumberCustomMessage, Validation, Verify } from '@vetnow-management/essentials';
import { SchemaMessages } from '../../../../util';

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
          ? this.createError({ message: validation[0] })
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
          ? this.createError({ message: validation[0] })
          : true;
      },
    ),
  email: yup
    .string()
    .required(required)
    .email(email)
    .test(
      'email',
      'E-mail ja cadastrado',
      function (value: string | undefined) {
        // Todo: Chamar endpoint para validar email
        return true;
      }
    )
});

export default ContatoValidationSchema;

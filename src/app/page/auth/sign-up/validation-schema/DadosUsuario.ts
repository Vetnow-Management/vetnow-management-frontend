import * as yup from 'yup';
import { SchemaMessages } from '../../../../util';

const {
  required,
} = SchemaMessages;

const DadosUsuarioValidationSchema = yup.object().shape({
  usuario: yup.object().shape({
    usuario: yup.string().required().trim(),
    senha: yup.string().required().trim(),
    perfil: yup.string().required(required).trim(),
  })
});

export default DadosUsuarioValidationSchema;

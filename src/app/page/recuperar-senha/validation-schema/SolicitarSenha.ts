import * as yup from 'yup';
import {SchemaMessages} from "../../../util";

const SOLICITAR_SENHA = yup.object().shape({
  email: yup.string()
    .required(SchemaMessages.required)
    .max(50, SchemaMessages.max(50))
    .email(SchemaMessages.email)
    .trim(),
});

export default SOLICITAR_SENHA;

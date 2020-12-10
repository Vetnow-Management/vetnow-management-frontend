import * as yup from "yup";
import {SchemaMessages} from "../../../../util";

const EnderecoValidationSchema = yup.object().shape({
  cep: yup.string()
    .max(50, SchemaMessages.max(50))
    .trim()
    .required(SchemaMessages.required)
  ,
  logradouro: yup.string()
    .max(50, SchemaMessages.max(50))
    .trim()
    .required(SchemaMessages.required)
  ,
  bairro: yup.string()
    .max(50, SchemaMessages.max(50))
    .trim()
    .required(SchemaMessages.required)
  ,
  localidade: yup.string()
    .max(50, SchemaMessages.max(50))
    .trim()
    .required(SchemaMessages.required)
  ,
  uf: yup.string()
    .max(50, SchemaMessages.max(50))
    .trim()
    .required(SchemaMessages.required)
  ,
  unidade: yup.string()
    .max(50, SchemaMessages.max(50))
    .trim()
  ,
  complemento: yup.string()
    .max(50, SchemaMessages.max(50))
    .trim()
  ,
});

export type IEndereco = yup.InferType<typeof EnderecoValidationSchema>;
export default EnderecoValidationSchema;

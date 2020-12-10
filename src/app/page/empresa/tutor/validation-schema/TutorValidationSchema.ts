import * as yup from 'yup';
import {SchemaMessages} from "../../../../util";
import EnderecoValidationSchema from "./EnderecoValidationSchema";
import ContatoValidationSchema from "../../../autenticacao/cadastro/validation-schema/Contato";

const TutorValidationSchema = yup.object().shape({
  uuid: yup.string()
    .trim(),
  nome: yup.string()
    .max(50, SchemaMessages.max(50))
    .trim()
    .required(SchemaMessages.required),
  dtNascimento: yup.string()
    .required(SchemaMessages.required),
  documento: yup.string()
    .max(14, SchemaMessages.max(14))
    .trim()
    .required(SchemaMessages.required),
  contato: ContatoValidationSchema.defined(),
  endereco: EnderecoValidationSchema.defined()
});

export type ITutor = yup.InferType<typeof TutorValidationSchema>;
export default TutorValidationSchema;

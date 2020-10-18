import * as yup from 'yup';
import {SchemaMessages} from "../../../util";

const ALTERAR_SENHA = yup.object().shape({
  usuario: yup.string().required(SchemaMessages.required).max(20, SchemaMessages.max(20)).trim(),
  senha: yup.string().required(SchemaMessages.required).max(20, SchemaMessages.max(20)).trim(),
  confirmarSenha: yup.string().required(SchemaMessages.required).max(20, SchemaMessages.max(20)).trim(),
});

export type IAlterarSenha = yup.InferType<typeof ALTERAR_SENHA>;
export default ALTERAR_SENHA;

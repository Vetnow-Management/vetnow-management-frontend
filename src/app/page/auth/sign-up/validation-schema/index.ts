import * as Yup from 'yup';
import DadosEmpresariaisValidationSchema from './DadosEmpresariais';
import DadosUsuarioValidationSchema from './DadosUsuario';

export { default as DadosEmpresariaisValidationSchema } from './DadosEmpresariais'
export { default as DadosPessoaisValidationSchema } from './DadosPessoais';
export { default as DadosUsuarioValidationSchema } from './DadosUsuario';

type IDadosPessoais = Yup.InferType<typeof DadosEmpresariaisValidationSchema>;
type IDadosEmpresariais = Yup.InferType<typeof DadosEmpresariaisValidationSchema>;
type IDadosUsuario = Yup.InferType<typeof DadosUsuarioValidationSchema>;

export type ICadastro = IDadosPessoais & IDadosEmpresariais & IDadosUsuario;

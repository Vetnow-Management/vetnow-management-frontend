import * as Yup from 'yup';
import DadosEmpresariaisValidationSchema from './DadosEmpresariais';
import DadosUsuarioValidationSchema from './DadosUsuario';
import DadosPessoaisValidationSchema from './DadosPessoais';

export { default as DadosEmpresariaisValidationSchema } from './DadosEmpresariais'
export { default as DadosPessoaisValidationSchema } from './DadosPessoais';
export { default as DadosUsuarioValidationSchema } from './DadosUsuario';

type IDadosPessoais = Yup.InferType<typeof DadosPessoaisValidationSchema>;
type IDadosEmpresariais = Yup.InferType<typeof DadosEmpresariaisValidationSchema>;
type IDadosUsuario = Yup.InferType<typeof DadosUsuarioValidationSchema>;

export type ICadastro = IDadosPessoais & IDadosEmpresariais & IDadosUsuario;

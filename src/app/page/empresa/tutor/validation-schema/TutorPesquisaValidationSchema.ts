import * as yup from "yup";
import {SchemaMessages} from "../../../../util";
import {Verify} from "@vetnow-management/essentials";


const TutorPesquisaValidationSchema = yup.object().shape({
  informacao: yup.string()
    .max(50, SchemaMessages.max(50))
    .trim()
    .test('informacao', 'Preencha sem caracteres especiais.',
      function (informacao: string): boolean {
        return Verify.isFalse(/([^dA-z0-9À-ú\s])/g.test(informacao))
      }),
})

export type ITutorPesquisa = yup.InferType<typeof TutorPesquisaValidationSchema>;
export default TutorPesquisaValidationSchema;

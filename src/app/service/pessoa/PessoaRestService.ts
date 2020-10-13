import { interval, Observable, of } from 'rxjs';

import { Cadastro } from './dominio';
import AbstractService from '../AbstractService';
import { HandleDates } from '../../util/decorators';
import { delay, timeout } from 'rxjs/operators';

class PessoaRestService extends AbstractService {
  public constructor() {
    super('pessoa');
  }

  @HandleDates()
  public cadastrarResponsavel(payload: Cadastro): Observable<any> {
    return this.post(payload);
    // return of({
    //   tipoPessoa: 'RESPONSAVEL',
    //   "uuid": "39868a42-6f72-4d5b-a52b-efeefe2dc458",
    //   "nome": "Mateus Gomes da SIlva",
    //   "dtNascimento": "2020-10-09",
    //   "documento": "941.333.252-57",
    //   "usuario": {
    //     "id": "1970-01-01T00:00:00.006Z",
    //     "usuario": "upHighsfdcxxc"
    //   },
    //   "endereco": {
    //     "cep": "73062-004",
    //     "logradouro": "AR 9 Conjunto 4",
    //     "complemento": "",
    //     "bairro": "Setor Oeste (Sobradinho II)",
    //     "localidade": "Brasília",
    //     "uf": "DF"
    //   },
    //   "contato": {
    //     "email": "tierra@whacddasdddk.com",
    //     "celular": "(61) 93232-6562"
    //   },
    //   "empresa": {
    //     "uuid": "bece54a4-38fd-437c-b978-489e053815c4",
    //     "razaoSocial": "Nao pode repetirrrrrasdasd",
    //     "documento": "60585312000136",
    //     "nitPisPasep": "412312322",
    //     "dataAbertura": "2020-10-09",
    //     "endereco": {
    //       "cep": "73062-004",
    //       "logradouro": "AR 9 Conjunto 4",
    //       "complemento": "",
    //       "bairro": "Setor Oeste (Sobradinho II)",
    //       "localidade": "Brasília",
    //       "uf": "DF"
    //     },
    //     "contato": {
    //       "email": "kkk@lll.comdddfff",
    //       "celular": "(61) 92332-4121"
    //     },
    //     "chave": {
    //       "id": "1970-01-01T00:00:00.012Z",
    //       "chave": "F4B75C95-424B66B3-891B2ABC-F555A378",
    //       "situacao": "ATIVO",
    //       "dataCadastro": "2020-10-11T05:40:52.068619",
    //       "dataExpiracao": "2020-10-18T05:40:52.068605"
    //     }
    //   },
    //   "informacaoTrabalhista": null,
    //   "_links": {
    //     "inativarAcesso": {
    //       "href": "http://backend.vetnow.com.vc:8081/pessoa/39868a42-6f72-4d5b-a52b-efeefe2dc458/inativar"
    //     }
    //   }
    // }).pipe(
    //   delay(3000),
    // )
  }
}

export default new PessoaRestService();

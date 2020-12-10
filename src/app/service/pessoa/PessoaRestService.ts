import {Observable} from 'rxjs';

import {Cadastro, Pessoa} from './dominio';
import {HandleDates} from '../../util';
import {AbstractRestService} from '../AbstractRestService';
import Cliente, {Page} from "./dominio/Cliente";
import {ITutor} from "../../page/empresa/tutor/validation-schema/TutorValidationSchema";

class PessoaRestService extends AbstractRestService {
  public constructor() {
    super('pessoa');
  }

  @HandleDates()
  public cadastrarResponsavel(payload: Cadastro): Observable<any> {
    return this.post({
      ...payload,
      tipoPessoa: 'RESPONSAVEL',
      usuario: {
        ...payload.usuario,
        perfil: 'ADMINISTRADOR',
      }
    });
  }

  public atualizar(tutor: ITutor): Observable<Cliente> {
    return this.put(tutor, `/cliente`);
  }

  public obterClientes(pagina: number = 0, tamanho: number = 10, informacao: string = ""): Observable<Page<Cliente>> {
    return this.get(`/cliente?informacao=${informacao}&pagina=${pagina}&tamanho=${tamanho}`);
  }

  public inativar(uuid: string): Observable<Pessoa> {
    return this.patch({}, `/${uuid}/inativar`)
  }
}

export default new PessoaRestService();

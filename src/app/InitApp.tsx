import React, { ReactElement, useEffect } from 'react';

import { interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

import Routes from './Routes';
import { BlockUI } from './component';
import useAppContext from './AppContext';
import { handleRequestError } from './util';
import { GitHubRestService, GitHubTag } from './service';
import { version as appVersion } from '../../package.json';

function obterNumeroVersao(versao: string, tipo: 'patch' | 'minor' | 'major'): string {
  const versaoSplitted = versao.split('.');

  switch (tipo) {
    case 'patch': return versaoSplitted[2];
    case 'minor': return versaoSplitted[1];
    case 'major': return versaoSplitted[0];
    default: throw new Error(`tipo ${tipo} nao suportado`);
  }
}

function requerAtualizarSistema(commits: GitHubTag[]): boolean {
  const obterPatch = (versao: string) => obterNumeroVersao(versao, 'patch');
  const obterMinor = (versao: string) => obterNumeroVersao(versao, 'minor');
  const obterMajor = (versao: string) => obterNumeroVersao(versao, 'major');

  const tagMaisRecente = commits
    .map((commit) => commit.name)
    .map((tag) => tag.replace('v', ''))[0]

  const isMajorIgual = obterMajor(appVersion) === obterMajor(tagMaisRecente);
  const isMinorIgual = obterMinor(appVersion) === obterMinor(tagMaisRecente);
  const isPatchIgual = obterPatch(appVersion) === obterPatch(tagMaisRecente);

  console.log('Sistema version: ', appVersion);
  console.log('Versao mais recente: ', tagMaisRecente);

  return !(isMajorIgual && isMinorIgual && isPatchIgual);
}

function InitApp(): ReactElement {
  const { blockUIStore: { estaMostrando }, notificacoesStore: { adicionarNotificacao }} = useAppContext();

  function aoObterTags(tags: GitHubTag[]): void {
    if (requerAtualizarSistema(tags)) {
      adicionarNotificacao({
        titulo: 'Atualização do sistema',
        conteudo: 'reinicie a página para atualizar o sistema',
        id: Math.random(),
        renderComponent: () => (
          <Button variant='contained'
                  color='primary'
                  style={{ marginBottom: 5}}
                  onClick={() => window.location.reload(true)}
          >
            Atualizar
          </Button>
        )
      })
    }
  }

  useEffect(() => {
    // a cada 5min obter tags do github
    interval(300000)
      .pipe(mergeMap(() => GitHubRestService.obterTags()))
      .subscribe(
        aoObterTags,
        handleRequestError('Erro ao verificar atualizações do sistema')
      );
  }, []);

  return (
    <BlockUI isOpen={estaMostrando}>
      <Routes />
    </BlockUI>
  )
}


export default observer(InitApp);

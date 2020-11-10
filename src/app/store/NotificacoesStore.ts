import { ReactNode } from 'react';

import { makeAutoObservable, reaction } from 'mobx';
import { Supplier } from '@vetnow-management/essentials';

import { LocalStorageChaves, LocalStorageService } from '../service/local-storage';

export default class NotificacoesStore {
  public readonly notificacoes: Notificacao[] = [];
  private jaVisualizouNotificacoes: boolean;

  constructor() {
    makeAutoObservable(this);
    this.jaVisualizouNotificacoes = LocalStorageService
      .obter<boolean>(LocalStorageChaves.JA_VISUALIZOU_NOTIFICACOES)
      .orElseGet(() => {
        LocalStorageService.salvar(LocalStorageChaves.JA_VISUALIZOU_NOTIFICACOES, false);
        return false;
      });

    // Sempre q a jaVisualizouNotificacoes mudar
    // salvar no localStorage;
    reaction(() => this.jaVisualizouNotificacoes, (value) => {
      LocalStorageService.salvar(LocalStorageChaves.JA_VISUALIZOU_NOTIFICACOES, value);
    })
  }

  public adicionarNotificacao = (notificacao: Notificacao): void => {
    this.notificacoes.push(notificacao);
    this.jaVisualizouNotificacoes = false;
  }

  public adicionarNotificacoes = (notificacoes: Notificacao[]): void => {
    this.notificacoes.concat(notificacoes);
    this.jaVisualizouNotificacoes = false;
  }

  public aoVisualizar = (): void => {
    // todo: no futuro talvez limpar a lista?
   this.jaVisualizouNotificacoes = true
  }

  public get totalNotificacoes(): number {
    return this.jaVisualizouNotificacoes ? 0 : this.notificacoes.length;
  }
}

interface Notificacao {
  id: string | number;
  titulo: string;
  conteudo: string;
  renderComponent?: Supplier<ReactNode | ReactNode[]>;
}

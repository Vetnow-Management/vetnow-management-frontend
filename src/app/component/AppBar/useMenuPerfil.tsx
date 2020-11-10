import React from 'react';

import { useKeycloak } from '@react-keycloak/web';
import { Fade, Menu, MenuItem } from '@material-ui/core';

export default function useMenuPerfil() {
  const { keycloak: { logout }} = useKeycloak();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const menuPerfilEstaAberto = Boolean(anchorEl);
  const menuId = 'id_menu-perfil-appbar';

  function aoClickMenuPerfil({ currentTarget }: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(currentTarget);
  }

  function aoFecharMenuPerfil(): void {
    setAnchorEl(null);
  }

  const menuPerfil = (
    <Menu open={menuPerfilEstaAberto}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={aoFecharMenuPerfil}
          TransitionComponent={Fade}
    >
      <MenuItem onClick={() => logout()}>Sair</MenuItem>
    </Menu>
  );

  return {
    menuId,
    aoClickMenuPerfil,
    menuPerfilComponent: menuPerfil,
  }
}

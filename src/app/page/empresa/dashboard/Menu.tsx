import React, {ReactElement, ReactNode, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Collapse} from "@material-ui/core";
import {ExpandLess, ExpandMore, Pets, StarBorder} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: theme.menuLateral.width,
    flexShrink: 0,
    "& span": {
      fontSize: "0.875rem !important",
    },
  },
  drawerPaper: {
    width: theme.menuLateral.width,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Menu(): ReactElement {
  const classes = useStyles();

  const [open, setOpen] = useState<string[]>([]);

  const openMenu = (prevState: string[], id: string): string[] => [...prevState, id];

  const closeMenu = (prevState: string[], id: string): string[] => prevState.filter(v => v !== id);

  const handleOpen = (id: string) => {
    const isOpen = open.indexOf(id) !== -1;
    const changeStateFunction = isOpen ? closeMenu : openMenu;
    setOpen(prevState => changeStateFunction(prevState, id));
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar}/>
      <Divider/>
      <ListItem id="menu-com-submenu" button onClick={() => handleOpen("menu-com-submenu")}>
        <ListItemIcon>
          <Pets/>
        </ListItemIcon>
        <ListItemText primary="Menu com submenu"/>
        {open.includes("menu-com-submenu") ? <ExpandLess/> : <ExpandMore/>}
      </ListItem>
      <Collapse in={open.includes("menu-com-submenu")} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder/>
            </ListItemIcon>
            <ListItemText primary="Submenu"/>
          </ListItem>
        </List>
      </Collapse>
      <Divider/>
      <List>
        {['Consultas', 'Consultas'].map((nome, index) => (
          <ListItem button key={`${nome}-${index}`}>
            <ListItemIcon><Pets/></ListItemIcon>
            <ListItemText primary={nome}/>
          </ListItem>
        ))}
      </List>
    </Drawer>

  );
}

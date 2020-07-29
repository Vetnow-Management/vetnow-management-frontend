import React from 'react';
import { StoreContext } from '../context';
import { IStoresContext } from '../interface';

export default function useStore(): IStoresContext {
  return React.useContext(StoreContext)
}

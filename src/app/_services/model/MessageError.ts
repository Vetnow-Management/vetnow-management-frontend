import HttpStatus from '@vetnow-management/essentials/dist/types/HttpStatus';

export interface MessageError {
  code?: number;
  status?: HttpStatus;
  message?: string;
  parametros?: string[];
}

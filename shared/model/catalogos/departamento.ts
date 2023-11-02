import { PuestoI } from './puesto';

export interface DepartamentoI {    
    idDepto: string;
    departamento: string;
    puestos?: PuestoI[];
}

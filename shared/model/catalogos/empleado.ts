
export type status = 'Alta ' | 'Baja'
export type sexo = 'Masculino' | 'Femenino'
export type tipo_contrato = 'Temporal' | 'Permanente'
export type tipo_sangre = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+'| 'AB-'| 'O+'| 'O-'

import { DireccionI } from './direccion';
import { DepartamentoI } from './departamento';
import { PuestoI } from './puesto';
import { CompaniaI } from './compania';
import { ContactoI } from './contacto';

export interface EmpleadoI {
    idEmpleado: string;
    nombre: string;
    aPaterno: string;
    aMaterno: string
    nombreCompleto?: string
    sexo: sexo;
    nacionalidad: string;
    fechaNacimiento?: Date;
    edad: number,
    fechaNacStr: string;
    tipoSanguineo: tipo_sangre;
    tipoContrato: tipo_contrato;
    departamento: DepartamentoI; 
    puesto: PuestoI;    
    idCompañia: string
    foto?: string;
    status: status;
    direccion: DireccionI;
    contacto: ContactoI
    fechaContrato: Date;    
    fechaContratoStr?: string
}
 
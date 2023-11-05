export type status = 'Activo' | 'Inactivo'

export interface MenuDetalleI {
    idMenu: string;    
    idPlatillo: string;
    platillo: string;
    status: status
    precio: string;
    iva: number;
}

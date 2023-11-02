export type status = 'Activo' | 'Inactivo'

export interface MenuDetalleI {
    id_menu: string;
    menu: string;
    id_menu_detalle: string;
    id_platillo: string;
    platillo: string;
    status: status
    precio: string;
    iva: number;
}

export type status = 'Activo' | 'Inactivo'

export interface MenuI {
    id_menu: string;
    menu: string;
    fecha_inicio: Date;
    status: status;
    usuario_creacion: string;
    fecha_creacion: Date
    usuario_modifica?: string;
    fecha_modificacion: Date
}

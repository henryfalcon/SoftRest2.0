export type status = 'Activo' | 'Inactivo'

export interface MenuI {
    idMenu: string;
    menu: string;
    fecha_inicio: Date;
    fecha_inicio_str?: string
    status: status;
    user_creation?: string
    fecha_creation?: Date;
    fecha_creation_str?: string
    foto?: string
}

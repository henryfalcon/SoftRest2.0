export type Rol = 'guest' | 'editor' | 'admin'

export interface UsuarioI {
    id_usuario: string;
    usuario: string;
    email_verificado?: boolean;
    contraseña?: string;
    photoURL?: string;
    rol: Rol;
    id_empleado?: string;
    id_compañia?: string;
    compañia?: string;
}

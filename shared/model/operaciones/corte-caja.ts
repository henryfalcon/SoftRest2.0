export interface CajaI {
    id_operacion?: string,
    id_caja?: string,
    cortez: number,
    fecha_hora_apertura?: Date,
    fecha_hora_cierre?: Date,
    saldo_inicial?: number,
    fondo_caja?: number,
    total_efectivo?: number,
    total_tc?: number,
    total_deb?: number,
    total_ingreso?: number,
    total_egreso?: number,
    saldo_pendiente?: number,
    saldo_final?: number,    
    status: string
    usuario_apertura?: string
    usuario_cierre?: string
}
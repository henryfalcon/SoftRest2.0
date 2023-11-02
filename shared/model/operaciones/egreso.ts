export interface EgresoI {
    id_operacion?: string
    id_caja?: string,
    id_egreso?: string,
    solicitante: string
    concepto: string,
    importe: number,
    id_usuario: string,
    usuario_autoriza: string,
    fecha_registro: Date,
    observacion: string
}
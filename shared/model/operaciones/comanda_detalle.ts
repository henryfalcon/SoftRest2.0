export interface comandaDetalleI {
    id_comanda: string,
    id_detalle: string,
    id_mesa_oper: string,
    id_operacion?: string,
    id_platillo?: string,    
    platillo: string,
    acompanamiento: string,
    cant: number,
    precio: number,
    subtotal: number,
    observacion?: string,
    status: string,
    status_cta: string,
    cargo?: number,
    abono?: number,
    saldo?: number,
    tipo?: string
}
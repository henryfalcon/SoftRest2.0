
export interface ComandaI {
    id_operacion: string;
    id_mesa_operacion?: string;
    id_comanda?: string;
    id_mesa: number;
    mesa: string;
    id_mesero: string;
    mesero: string
    cliente: string,
    status: string;
    hora_solicitado: Date;
    hora_solicitado_str?: string;
    hora_despachado?: Date;
    tiempo_de_entrega?: Date;
    cargo?: number;
    abono?: number;
    saldo?: number;
}

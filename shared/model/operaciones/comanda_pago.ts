export interface ComandaPagoI {
    id_pago: string;
    id_operacion: string;
    id_mesa_operacion: string;
    id_mesero: string;
    mesero: string;
    mesa: string;
    id_usuario: string;
    fecha_cobro: Date;
    forma_pago: string;
    monto: number;
    banco?: string;
    tipo_tarjeta?: string;
    ccv?: string;
    fecha_vencimiento?: Date;
    comandas: string[];
    tipo?: string;
}
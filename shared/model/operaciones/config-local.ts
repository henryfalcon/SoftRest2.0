
export interface ConfigLocalI {
    asign_mesa_mesero: boolean,
    config_name: string;
    id_company: string;
    id_config: string;
    mesas: number;
    meseros: number;
    hora_inicio: Date;
    hora_termino?: Date;
    observacion?: string;
}
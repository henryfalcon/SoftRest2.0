
export interface ConfiguracionI {
    id_config: string;
    config: string;
    mesas: number;
    meseros: number;
    fecha_inicio: Date
    hora_inicio: Date;
    fecha_termina: Date;
    fondo_fijo: number;
    hora_termino: Date;
    observacion: string;
    id_compañia: string;
    compañia: string;    
}

import { TipoDineroI } from "./tipoDinero";

export interface DesgloseCajaI {
    id_desglose?: string;
    id_caja: string;
    id_operacion: string;
    total: number;
    desglose: TipoDineroI[];
}   
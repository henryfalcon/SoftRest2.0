export interface TipoDineroI {
    id: string;
    tipo: string;
    descripcion: string;
    moneda?: string
    divisa?: string;
    valor_divisa?: number;
    importe: number;
    orden: number;
    cant?: number;
    total?: number;
}
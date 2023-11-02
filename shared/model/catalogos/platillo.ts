export interface PlatilloI {
    idPlatillo: string
    desc_corta: string
    desc_larga: string
    ingredientes?: string
    acompanamiento?: string
    guarnicion?: string
    idCategoria: string
    categoria: string
    costo?: number
    precio?: number
    status: string
    tiempo_preparacion?: string
    tiempo_alimento: string
    imagen?: string
    dashboard?: boolean
    fecha_alta: Date
    fecha_alta_str: string
}

export interface TableRow {
  id: number
  steName: string
  isActual: boolean
  priceEndDate: number | null
  priceNotNds: number | null
  nds: number | null
  price: number | null
  fillEndDate: string
}

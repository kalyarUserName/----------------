import type { TableRow } from '../types/table'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTableStore = defineStore('table', () => {
  const tableData = ref<TableRow[]>([])
  const isLoading = ref(false)
  // const editingRowId = ref(null); //если можно не отображать во всех строках сразу все тяжелые UI. В таком случае отображаем span со значением

  async function fetchData() {
    isLoading.value = true
    await new Promise((resolve) => setTimeout(resolve, 2000))

    tableData.value = [
      {
        id: 1,
        steName: 'АЗОТ ГАЗООБРАЗНЫЙ СОРТ - ПЕРВЫЙ ТЕХНИЧЕСКИЙ БАЛЛОН 50 Л',
        isActual: true,
        priceEndDate: null,
        priceNotNds: null,
        nds: null,
        price: null,
        fillEndDate: '21.03.2023',
      },
      {
        id: 2,
        steName: 'OZONE MICRONE H-67 НАБОР ФИЛЬТРОВ ДЛЯ ПЫЛЕСОСОВ ELECTROLUX CYCLONE',
        isActual: true,
        priceEndDate: null,
        priceNotNds: null,
        nds: null,
        price: null,
        fillEndDate: '22.04.2024',
      },
      {
        id: 3,
        steName: 'OZONE MICRONE H-67 НАБОР ФИЛЬТРОВ ДЛЯ ПЫЛЕСОСОВ ELECTROLUX CYCLONE',
        isActual: true,
        priceEndDate: null,
        priceNotNds: null,
        nds: null,
        price: null,
        fillEndDate: '23.05.2025',
      },
    ]

    isLoading.value = false
  }

  function updateRow(index: number, patch: Partial<TableRow>) {
    const oldRow = tableData.value[index]
    if (oldRow) {
      const updatedRow = {
        ...tableData.value[index],
        ...patch,
      }

      if (updatedRow.priceNotNds != null && updatedRow.nds != null) {
        const newPrice = +(updatedRow.priceNotNds * (1 + updatedRow.nds / 100)).toFixed(2)
        updatedRow.price = newPrice
      } else {
        updatedRow.price = null
      }

      tableData.value[index] = updatedRow

      logging(tableData.value[index])
    }
  }

  function logging(row: TableRow) {
    const date = row?.priceEndDate
      ? new Date(row?.priceEndDate).toLocaleDateString()
      : row?.priceEndDate

    console.log(
      'Текущее состояние (id, isActual, price, priceNotNds, nds, priceEndDate):',
      row?.id,
      row?.isActual,
      row?.price,
      row?.priceNotNds,
      row?.nds,
      date
    )
  }

  return { tableData, isLoading, fetchData, updateRow }
})

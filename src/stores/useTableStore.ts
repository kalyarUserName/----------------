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

  return { tableData, isLoading, fetchData }
})

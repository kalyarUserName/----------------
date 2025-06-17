<script setup lang="ts">
import { useTableStore } from '@stores/useTableStore'
import { TableRow } from '@/types/table'
import { DataTableColumn, NDatePicker, NInputNumber, NSwitch } from 'naive-ui'

const tableStore = useTableStore()

const { tableData, isLoading } = storeToRefs(tableStore)

onMounted(() => {
  tableStore.fetchData()
})
// можно сделать отображение span вместо тяжелых компонентов, если строка редактируется.
const TABLE_HEADERS: DataTableColumn<TableRow>[] = [
  {
    key: 'steName',
    title: 'Наименование СТЕ',
    sorter: true,
    defaultSortOrder: 'ascend',
  },
  {
    key: 'isActual',
    title: 'В наличии',
    minWidth: 110,
    align: 'center',
    render(row: TableRow, index: number) {
      return h(NSwitch, {
        value: row.isActual,
        onUpdateValue: (val: boolean) => {
          tableStore.updateRow(index, { isActual: val })
        },
      })
    },
  },
  {
    key: 'priceEndDate',
    title: 'Срок действия предоставленных сведений',
    render(row: TableRow, index: number) {
      return h(NDatePicker, {
        value: row.priceEndDate,
        type: 'date',
        placeholder: 'Выберите дату',
        onUpdateValue: (val: number) => {
          tableStore.updateRow(index, { priceEndDate: val })
        },
      })
    },
  },
  {
    key: 'priceNotNds',
    title: 'Цена, руб. без НДС',
    render(row: TableRow, index: number) {
      return h(NInputNumber, {
        value: row.priceNotNds,
        placeholder: 'Введите значение',
        type: 'number',
        onUpdateValue: (val: number | null) => {
          tableStore.updateRow(index, { priceNotNds: val })
        },
      })
    },
  },
  {
    key: 'nds',
    title: 'НДС, %',
    render(row: TableRow, index: number) {
      return h(NInputNumber, {
        value: row.nds,
        placeholder: 'Введите значение',
        type: 'number',
        onUpdateValue: (val: number | null) => {
          tableStore.updateRow(index, { nds: val })
        },
      })
    },
  },
  {
    key: 'price',
    title: 'Цена, руб. с НДС',
  },
  {
    key: 'fillEndDate',
    title: 'Срок заполнения',
  },
]
</script>

<template>
  <n-data-table
    :columns="TABLE_HEADERS"
    :data="tableData"
    :loading="isLoading"
    :bordered="true"
    :scroll="{ type: 'virtual' }"
    :row-key="(row: TableRow) => row.id"
    style="height: 400px"
  />
</template>

<style scoped>
:deep(.n-data-table-th) {
  color: white;
  text-align: center;
  text-transform: uppercase;
}

:deep(.n-data-table-th.n-data-table-th--sortable) {
  background-color: #4a90e2;

  color: white;
  text-align: center;
  text-transform: uppercase;
}

/* Иначе не получается стилизовать, через тему */
:deep(.n-data-table-th.n-data-table-th--sortable:hover),
:deep(.n-data-table-th.n-data-table-th--active) {
  background-color: #4a90e2;
}

/* Иначе не получается стилизовать, через тему */
:deep(.n-data-table-sorter) {
  color: white !important;
}

/* Иначе не получается стилизовать, через тему */
:deep(.n-data-table-th) {
  font-weight: 600;
}

:deep(.n-button:hover) {
  color: #016fed;
}
</style>

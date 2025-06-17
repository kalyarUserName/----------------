<script setup lang="ts">
import { useTableStore } from '@stores/useTableStore'
import { TableRow } from '@/types/table'
import { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { NDatePicker, NInputNumber, NSwitch } from 'naive-ui'

const tableStore = useTableStore()

const { tableData, isLoading } = storeToRefs(tableStore)

onMounted(() => {
  tableStore.fetchData()
})
// можно сделать отображение span вместо тяжелых компонентов, если строка редактируется.
const TABLE_HEADERS: TableColumn<TableRow>[] = [
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
          tableData.value[index].isActual = val
          logging(tableData.value[index])
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
          tableData.value[index].priceEndDate = val
          logging(tableData.value[index])
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
          tableData.value[index].priceNotNds = val
          updateTotal(index)
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
          tableData.value[index].nds = val
          updateTotal(index)
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

function updateTotal(index: number) {
  const row: TableRow = tableData.value[index]
  if (row.priceNotNds != null && row.nds != null) {
    row.price = +(row.priceNotNds * (1 + row.nds / 100)).toFixed(2)
  } else {
    row.price = null
  }
  logging(row)
}
</script>

<template>
  <!-- <n-spin v-if="isLoading" /> -->

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

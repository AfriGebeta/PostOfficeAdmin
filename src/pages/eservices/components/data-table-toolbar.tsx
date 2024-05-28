// import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

// import { Button } from '@/components/custom/button'
// import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'

// import { priorities, statuses } from '../data/data'
// import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  setData: React.Dispatch<React.SetStateAction<TData[]>>
  data: TData[]
}

export function DataTableToolbar<TData>({
  table,
  data,
  setData
}: DataTableToolbarProps<TData>) {
  // const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-end'>
      
      <DataTableViewOptions table={table} setData={setData} data={data}/>
    </div>
  )
}

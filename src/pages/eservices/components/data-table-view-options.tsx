import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import SendNew from '../SendNew'
import { Dispatch, SetStateAction } from 'react'
import { EService } from '..'
// import BullkUpload from '../BulkUpload'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  setData: React.Dispatch<React.SetStateAction<TData[]>>
  data: TData[]
}

export function DataTableViewOptions<TData>({
  table,
  setData,
  data
}: DataTableViewOptionsProps<TData>) {
  return (
    <div className='flex flex-row gap-4 items-center'>
      <SendNew setEServices={setData as Dispatch<SetStateAction<EService[]>>} eServices={data as EService[]}/>
      {/* <BullkUpload /> */}
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto hidden h-8 lg:flex'
        >
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    
  )
}

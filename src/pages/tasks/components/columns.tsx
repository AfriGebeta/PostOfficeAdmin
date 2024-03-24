import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { priorities } from '../data/data'
import { Task } from '../data/schema'
import { Button } from '@/components/custom/button'
import { toast } from '@/components/ui/use-toast'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center'>
        <span>{row.getValue('category')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Priority' />
    ),
    cell: ({ row }) => {
      const label = priorities.find(
        (label) => label.value === row.original.priority
      )
      return (
        <>
          {label && (
            <div className='flex flex-row'>
              <label.icon className='mr-2 h-4 w-4 text-muted-foreground' />
              <Badge variant='outline'>{label?.label}</Badge>
            </div>
          )}
        </>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'details',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Details' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('details')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'driver assigned',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Driver' />
    ),
    cell: ({ row }) => {
      const driver = row.original.driverAssigned
      const assignDriver = () => {
        toast({
          title: 'No drivers available',
          description:
            'We could not find any drivers available for this task at the moment',
        })
      }
      return (
        <>
          {driver ? (
            <div className='flex flex-row items-center'>
              <img
                src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${driver}`}
                alt={driver}
                className='h-8 w-8 rounded-full'
              />
              <span className='ml-2'>{driver}</span>
            </div>
          ) : (
            <Button
              variant='outline'
              className='flex h-8 w-auto flex-row items-center justify-start px-4 py-0 data-[state=open]:bg-muted'
              onClick={assignDriver}
            >
              Assign
            </Button>
          )}
        </>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]

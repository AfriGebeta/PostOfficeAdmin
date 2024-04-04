import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { priorities } from '../data/data'
import { Task } from '../data/schema'
import { Button } from '@/components/custom/button'
import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { names } from '../data/tasks'

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
    accessorKey: 'trackingNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='trackingNumber' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('trackingNumber')}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Priority' />
    ),
    cell: ({ row }) => {
      // get a random priority
      const label = priorities[Math.floor(Math.random() * priorities.length)]
      return (
        <>
          {label && (
            <div className='flex flex-row'>
              <label.icon className='mr-2 h-4 w-4 text-muted-foreground' />
              <Badge variant='outline'>{label.label}</Badge>
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
    accessorKey: 'from',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='From' />
    ),
    cell: ({ row }) => {
      const [from, setFrom] = useState<any>(null)
      const getUserById = async (id: string) => {
        const user = await axios(import.meta.env.VITE_API_URL + '/profile?id=' + id).then(res => {
          return res.data
        }).catch(err => {
          console.error(err)
          return null
        })
        return user
      }
      useEffect(() => {
        getUserById(row.original.sentFromId).then(user => {
          setFrom(user)
        })
      }, []);
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {from?.firstName} {from?.lastName}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'to',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='To' />
    ),
    cell: ({ row }) => {
      const [to, setTo] = useState<any>(null)
      const getUserById = async (id
        : string) => {
        const user = await axios(import.meta.env.VITE_API_URL + '/profile?id=' + id).then(res => {
          return res.data
        }).catch(err => {
          console.error(err)
          return null
        })
        return user
      }
      useEffect(() => {
        getUserById(row.original.sentToId).then(user => {
          setTo(user)
        })
      }, []);

      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {to?.firstName} {to?.lastName}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => {

  
      return (
      
      <div className='flex items-center'>
        <span>{row.getValue('type')}</span>
      </div>
    )},
  },
  {
    accessorKey: 'driver assigned',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Driver' />
    ),
    cell: ({ row }) => {
      const driver = names[Math.floor(Math.random() * names.length)]
      const assignDriver = () => {
        row.original.driverAssigned = driver
        toast({
          title: 'Driver assigned',
          description:
            `Driver ${driver} has been assigned to the task`,
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

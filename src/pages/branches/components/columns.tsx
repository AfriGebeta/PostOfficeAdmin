import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'

import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/custom/button'
import { useState } from 'react'
import { Branch } from '..'

export const columns: ColumnDef<Branch>[] = [
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
    accessorKey: 'details',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Details' />
    ),
    cell: ({ row }) => {

      return (
      
      <div className='flex items-center'>
        <span>{row.original.name}</span>
      </div>
    )},
  },
  {
    accessorKey: 'delete',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Delete Branch' />
    ),
   //@ts-ignore
   cell: ({ row }) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleBranchDelete = () => {
      //@ts-ignore
      axios.delete(import.meta.env.VITE_API_URL + "/branch?id=" + row.original.id).then(res => {
        console.log(res.data, "from delete");
        setIsLoading(false)
        toast({
          title: 'Branch deleted!',
          description: `Branch ${row.original.name} has been deleted.`,
        })
        window.location.reload();
      }).catch(err => {
        console.error(err)
        setIsLoading(false)
        toast({
          title: 'Something went wrong!',
          description: `Error: ${err}`,
        })
      })
    };
      return (
        <Button
          onClick={handleBranchDelete}
          loading={isLoading}
        >
          Delete
        </Button>
      )
   },
    
  }
  
]

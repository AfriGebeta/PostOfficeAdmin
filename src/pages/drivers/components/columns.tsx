import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'

import { PostalUser } from '@/hooks/authProvider'
import { Button } from '@/components/custom/button'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'

export const columns: ColumnDef<PostalUser>[] = [
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
      const employeeName = row.original.firstName + ' ' + row.original.lastName
      return (
        <div className='flex flex-row space-x-2'>
          <img
                src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${employeeName}`}
                alt={employeeName}
                className='h-8 w-8 rounded-full'
              />
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {employeeName}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone Number' />
    ),
    //@ts-ignore
    cell: ({ row }) => <div>{"+251 " + row.original.phoneNumber}</div>,
    
  },
  {
    accessorKey: 'delete',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Delete Employee' />
    ),
   //@ts-ignore
   cell: ({ row }) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleEmployeeDelete = () => {
      setIsLoading(true)
      //@ts-ignore
      axios.delete(import.meta.env.VITE_API_URL + "/employee?id=" + row.original.employeeId).then(res => {
        console.log(res.data, "from delete");
        setIsLoading(false)
        toast({
          title: 'Employee deleted!',
          description: `Employee ${row.original.firstName} ${row.original.lastName} has been deleted.`,
        })
        window.location.reload();
      }).catch((err: unknown) => {
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
          onClick={handleEmployeeDelete}
          loading={isLoading}
        >
          Delete
        </Button>
      )
   },
    
  }
  
]

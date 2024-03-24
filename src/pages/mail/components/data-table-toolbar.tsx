import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'

import { priorities, statuses } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

type Checked = DropdownMenuCheckboxItemProps['checked']

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [priorityState, setPriority] = React.useState<Checked>(true)
  const [ showDialog, setShowDialog ] = React.useState(false)

  const assignDriver = () => {
    toast({
      title: 'No drivers available',
      description:
        'We could not find any drivers available for this task at the moment',
    })
  }

  const handleSaveChanges = () => {
    toast({
      title: 'Changes saved',
      description: 'The task has been successfully updated',
    })

    setShowDialog(false)
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter tasks...'
          value={(table.getColumn('details')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('details')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={statuses}
            />
          )}
          {table.getColumn('priority') && (
            <DataTableFacetedFilter
              column={table.getColumn('priority')}
              title='Priority'
              options={priorities}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='flex flex-row gap-2'>
        <DataTableViewOptions table={table} />
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button variant='default'>Create</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add a new mail entry</DialogTitle>
              <DialogDescription>
                If a user has manually delivered the mail, you can add a new
                entry here.
              </DialogDescription>
            </DialogHeader>
            <div className='gap-4 py-4 flex flex-col items-start justify-start'>
              <div className='flex flex-row items-center justify-start  gap-4'>
                <Label htmlFor='name' className='text-right'>
                  From:
                </Label>
                <Input
                  id='from'
                  defaultValue='Pedro Duarte'
                  className='col-span-3'
                />
              </div>
              <div className='flex flex-row items-center justify-start  gap-9'>
                <Label htmlFor='username' className='text-right'>
                  To:
                </Label>
                <Input
                  id='username'
                  defaultValue='@peduarte'
                  className='col-span-3'
                />
              </div>
              <div className='flex flex-row items-center space-x-2 gap-2 justify-start'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Paid
                </label>
             
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='w-20'>Priority</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>Priority</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {priorities.map((priority) => (
                    <DropdownMenuCheckboxItem
                      checked={priorityState}
                      onCheckedChange={setPriority}
                    >
                      {priority.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
              variant='outline'
              className='flex h-8 w-auto flex-row items-center justify-start px-4 py-0 data-[state=open]:bg-muted'
              onClick={assignDriver}
            >
              Assign
            </Button>
            </div>
            </div>
            <DialogFooter>
              <Button type='submit' onClick={handleSaveChanges}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

import { Row } from '@tanstack/react-table'
import axios from 'axios'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


import { toast } from '@/components/ui/use-toast'

import { statuses } from '../data/data'
import React from 'react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {


  const status = statuses.find(
    (status) => status.value === row.getValue('status')
  )

  if (!status) {
    return null
  }
  const [visibleStatus, setVisibleStatus] = React.useState(status)

  const handleStatusChange = (givenStatus: any) => {
    const newStatus = statuses.find((status) => status.value === givenStatus.value)
    if(newStatus){
      setVisibleStatus(newStatus)
    }
    // send a get request to https://api.afromessage.com/api/send?from={IDENTIFIER_ID}&sender={YOUR_SENDER_NAME}&to={YOUR_RECIPIENT}&message={YOUR_MESSAGE}&callback={YOUR_CALLBACK}
    // with a bearer token in the header from the env file (afroMessageToken)
    // if we get an "acknowledge":"success", then we show a toast with the message "Message sent successfully"
    // if we get an "acknowledge":"error", then we show a toast with the message "Message failed to send"
    const apiUrl = import.meta.env.VITE_API_URL
    console.log({row: row.original})  

   axios.post(apiUrl + `/sendsms`, {
      //@ts-ignore
      YOUR_RECIPIENT: row.original.phoneNumber,
      MESSAGE: `The status of your package ${row.getValue('details')} status has been updated to ${visibleStatus.label}`
  }).then((response) => {
    console.log(response)
    if(response.data.acknowledge === 'success'){
      toast({
        title: 'Message sent!',
        description: 'A message has been sent to the recipient.',
      })
    } else {
      toast({
        title: 'Message failed to send',
        description: `'The message failed to send.': ${response.data}`,
      })
    }}).catch((error) => {
      console.error(error)
      toast({
        title: 'Message failed to send',
        description: `'The message failed to send.': ${error.message}`,
      })
      });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-full flex-row items-center justify-start p-0 data-[state=open]:bg-muted'
        >
          {visibleStatus.icon && (
            <visibleStatus.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{visibleStatus.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuRadioGroup value={visibleStatus.label}>
          {statuses.map((status) => (
            <DropdownMenuRadioItem
              key={status.value}
              value={status.value}
              onClick={() => handleStatusChange(status)}
            >
              <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
              {status.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        {/* <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {statuses.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

;<div className='flex w-[100px] items-center'></div>

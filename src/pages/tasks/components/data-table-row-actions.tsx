import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { generateStatus, statuses } from '../data/data'
import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  // const status = statuses.find(
  //   (status) => status.value === row.getValue('status')
  // )
// assign a random status to the task
const apiUrl = import.meta.env.VITE_API_URL

    const sendSms = async (phoneNumber: string, newStatus: { value: string }) => await axios.post(apiUrl + `/sendsms`, {
      //@ts-ignore
      YOUR_RECIPIENT: phoneNumber,
      MESSAGE: `The status of your package has been updated to ${newStatus.value}`
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
      //@ts-ignore
      const updatePackageStatus = async (newStatus: string) => await axios.put(apiUrl + `/package?id=${row.original.id}`, {
        status: newStatus
    }).then((response) => {
      console.log(response)
      toast({
        title: 'Status updated!',
        description: 'The status has been updated successfully.',
      })}).catch((error) => {
        console.error(error)
        toast({
          title: 'Internal failure',
          description: `Failed with error: ${error.message}`,
        })
        });

      console.log("statis" ,row.original);
      //@ts-ignore
// const status = row.original.status;
  // if (!status) {
  //   return null
  // }
  const [visibleStatus, setVisibleStatus] = React.useState(generateStatus(row.original.status))

  const handleStatusChange = (givenStatus: any) => {
    const newStatus = statuses.find((status) => status.value === givenStatus.value)
    if(newStatus){
      console.log("setting status", {newStatus}, "selected status", {givenStatus})
      setVisibleStatus(generateStatus(newStatus.value))
    }
    // send a get request to https://api.afromessage.com/api/send?from={IDENTIFIER_ID}&sender={YOUR_SENDER_NAME}&to={YOUR_RECIPIENT}&message={YOUR_MESSAGE}&callback={YOUR_CALLBACK}
    // with a bearer token in the header from the env file (afroMessageToken)
    // if we get an "acknowledge":"success", then we show a toast with the message "Message sent successfully"
    // if we get an "acknowledge":"error", then we show a toast with the message "Message failed to send"
    
    console.log({row: row.original})  
    //@ts-ignore
   sendSms(row.original.sentTo.phoneNumber, newStatus)
  //@ts-ignore
   sendSms(row.original.sentFrom.phoneNumber, newStatus)
  updatePackageStatus(givenStatus.value);
  }

  useEffect(() => {
    console.log("visibleStatus changed to", visibleStatus)
  }, [visibleStatus])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-full flex-row items-center justify-start p-0 data-[state=open]:bg-muted'
        >
          {visibleStatus.icon && (
            <visibleStatus.icon className='mr-2 h-4 w-4 text-muted-foreground' color={visibleStatus.color} />
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
              <status.icon className='mr-2 h-4 w-4 text-muted-foreground' color={status.color} />
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

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
import { EmployeeUser } from '@/pages/drivers'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
    cell: () => {
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
      const [isLoading, setIsLoading] = useState(false)
      const [drivers, setDrivers] = useState<EmployeeUser[]>([])
      const [visibleStatus, setVisibleStatus] = useState("")
      console.log(isLoading)
    const handleDriverFetch = () => {
      setIsLoading(true)
      //@ts-ignore
      axios(import.meta.env.VITE_API_URL + "/employee").then(res => {
        console.log(res.data, "from getDrivers ====--------====");
        setDrivers(res.data.filter((empl: any) => empl.isDriver).map((empl: any) => {
          return {
            ...empl,
            //@ts-ignore
            ...empl.profile,
            employeeId: empl.id
          }
        }))
        setIsLoading(false)
      }).catch((err: unknown) => {
        console.error(err)
        setIsLoading(false)
        toast({
          title: 'Something went wrong!',
          description: `Error: ${err}`,
        })
      })
    };
      // const driver = names[Math.floor(Math.random() * names.length)]
      const assignDriver = (driver: EmployeeUser) => {
        if(driver) {
          axios.put(import.meta.env.VITE_API_URL + "/package?id=" + row.original.id, {
            // @ts-ignore
            assignedTo: driver.id
          }).then(res => {
            console.log(res.data, "from assignDriver");
            //@ts-ignore
            sendSms(driver.phoneNumber);
            sendNotification(driver)
            toast({
              title: 'Driver assigned!',
              description: `Driver ${driver.firstName} ${driver.lastName} has been assigned to task ${row.original.trackingNumber}.`,
            })
            setVisibleStatus(driver.firstName + " " + driver.lastName)
            // window.location.reload();
          }).catch(err => {
            console.error(err)
            toast({
              title: 'Something went wrong!',
              description: `Error: ${err}`,
            })
          })
        }
      }

      const findDriver = () => {
        // @ts-ignore
        return drivers.find(driver => driver.id === row.original.assignedTo) || {
          firstName: "No",
          lastName: "Driver"
        }
      }

      const sendSms = async (phoneNumber: string) => await axios.post(import.meta.env.VITE_API_URL + `/sendsms`, {
        //@ts-ignore
        YOUR_RECIPIENT: phoneNumber,
        MESSAGE: `You have been assigned to deliver the package ${row.original.id}`
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
        const sendNotification = async (driver: EmployeeUser) => await axios.post(import.meta.env.VITE_API_URL + `/notification/send-notification`, {
          //@ts-ignore
          id: driver.id,
          title: `Package assigned`,
          body: {
            packageId: row.original.id,
            status: 'assigned',
            message: `You have been assigned to deliver the package`
          }
      }).then((response) => {
        console.log(response)
        
          toast({
            title: 'Notification sent',
            description: 'The notification has been sent successfully.'
          })}
        ).catch((error) => {
          console.error(error)
          toast({
            title: 'Notification failed to send',
            description: `'The message failed to send.': ${error.message}`,
          })
          });

      useEffect(() => {
        handleDriverFetch()
      }, [])

      useEffect(() => {
        console.log(drivers, "driver changed", row.original);
      }, [drivers])
      return (
        <>
          {row.original.assignedTo ? (
            <div className='flex flex-row items-center'>
              <img
                src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${row.original.assignedTo}`}
                alt={"driver"}
                className='h-8 w-8 rounded-full'
              />
              <span className='ml-2'>{findDriver()?.firstName + " "+ findDriver()?.lastName}</span>
            </div>
          ) : (

            <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button
              variant='outline'
              className='flex h-8 w-auto flex-row items-center justify-start px-4 py-0 data-[state=open]:bg-muted'
              // onClick={assignDriver}
            >
              Assign
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuRadioGroup value={visibleStatus}>
          {drivers.map((driver) => (
            <DropdownMenuRadioItem
              key={driver.firstName + " " + driver.lastName}
              value={driver.firstName + " " + driver.lastName}
              onClick={() => assignDriver(driver)}
            >
              {driver.firstName + " " + driver.lastName}
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

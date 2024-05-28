"use client"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { HTMLAttributes, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { PostalUser } from '@/hooks/authProvider'
import { toast } from '@/components/ui/use-toast'

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {
  onSubmitCallback: () => void,
  isDriver: boolean
}

type Branch = {
  id: string
  name: string
  location: {
    latitude: number
    longitude: number
  }
}

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter your name' }),
    phone: z
    .string()
    .min(1, { message: 'Please enter your phone' }).min(9, { message: 'Phone number is not valid' }).max(9, { message: 'Phone number is not valid' }),
    password: z
      .string()
      .min(1, {
        message: 'Please enter your password',
      })
      .min(3, {
        message: 'Password must be at least 3 characters long',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })
  const [branches, _setBranches] = useState<Branch[]>([])

    const [ drivers ] = useState<PostalUser[]>([])
    const [profile, setProfile] = useState<PostalUser | null>(null)
    const [currentDriver, setCurrentDriver] = useState<PostalUser | null>(null)
    const [position, setPosition] = useState("BASIC")

    const createProfile = async () => {
      let fetchDrivers = await axios.post(import.meta.env.VITE_API_URL + '/profile/signup', {
        firstName: form.getValues().name.split(' ')[0],
        lastName: form.getValues().name.split(' ')[1],
        phoneNumber: form.getValues().phone,
        password: form.getValues().password,
        location: {
          name: 'Main',
          coords: {
            latitude: branches[0].location.latitude,
            longitude: branches[0].location.longitude
          }
        }
      }).then(res => {
        setProfile(res.data)
      }).catch((err: unknown) => {
        console.error(err, "------------fails here.")
        toast({
          title: 'Something went wrong!',
          description: `Error: ${err}`,
        })
        return []
      });
      
      console.log(fetchDrivers, "from drivers======", drivers);
      
    }
 
    
    const createDriver = async () => {
      let createDriver = await axios.post(import.meta.env.VITE_API_URL + '/employee', {
        profileId: profile?.id,
        branchId: branches[0].id,
        isDriver: props.isDriver,
        permissionLevel: PermissionLevel[position as keyof typeof PermissionLevel]
      }).then(res => {
        setCurrentDriver(res.data)
      }).catch((err: unknown) => {
        console.error(err)
        toast({
          title: 'Something went wrong!',
          description: `Error: ${err}`,
        })
        return []
      });
      
      console.log(createDriver, "from drivers======", drivers);
      
    }

    const handleUpdate = async () => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: 'Employee updated!',
          description: `Employee ${form.getValues().name} has been updated.`,
        })
        window.location.reload();
      }, 3000)
    };

  
  useEffect(() => {
    if(branches.length > 0) {
      createProfile()
    }
  }, [branches])

  useEffect(() => {
    if(profile) {
      createDriver()
    }
  }, [profile])

  useEffect(() => {
    if(currentDriver) {
      props.onSubmitCallback()
    }
  }, [currentDriver])

  enum PermissionLevel {
    //  Basic="BASIC",
     Employee="LEMAJ",
     Manager="LIMDYALEW",
     Admin="MASTER",
    //  Admin="OWNER",
    }


  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className='flex items-center'>
                      <p className='text-sm text-gray-400 p-2'>+251</p> <Input placeholder='- - -  - -  - -  - -' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Jim James' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Employee Permission Level</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Permission Level</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {
            Object.keys(PermissionLevel).map((permissionLevel) => (
              <DropdownMenuRadioItem key={permissionLevel} value={permissionLevel}>
                {permissionLevel}
              </DropdownMenuRadioItem>
            ))
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
            <Button className='mt-2' loading={isLoading}>
              Update
            </Button>

            {/* <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div> */}

            {/* <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandGithub className='h-4 w-4' />}
              >
                GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandFacebook className='h-4 w-4' />}
              >
                Facebook
              </Button>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  )
}

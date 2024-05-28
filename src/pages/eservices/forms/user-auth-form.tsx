"use client"
 
import {
  DropdownMenu
} from "@/components/ui/dropdown-menu"

import { HTMLAttributes, SVGProps, useEffect, useState } from 'react'
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
  const [branches, setBranches] = useState<Branch[]>([])

  const handleBranchFetch = async () => {
    await axios(import.meta.env.VITE_API_URL + '/branch').then(res => {
      setBranches(res.data as Branch[])
    }).catch((err: unknown) => {
      console.error(err)
      toast({
        title: 'Something went wrong!',
        description: `Error: ${err}`,
      })
      return []
    });
  };

    const [ drivers ] = useState<PostalUser[]>([])
    const [_profile, setProfile] = useState<PostalUser | null>(null)
    const [currentDriver, _setCurrentDriver] = useState<PostalUser | null>(null)

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
        toast({
          title: 'E-service created!',
          description: `Profile ${res.data.firstName} ${res.data.lastName} has been created.`,
        })
       form.reset()
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
 
    
  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(data)

    setTimeout(() => {
      setIsLoading(false)
      handleBranchFetch()
    }, 3000)
  }

  useEffect(() => {
    if(branches.length > 0) {
      createProfile()
    }
  }, [branches])



  useEffect(() => {
    if(currentDriver) {
      toast({
        title: 'Driver created!',
        description: `Driver ${currentDriver.firstName} ${currentDriver.lastName} has been created.`,
      })
      window.location.reload();
    }
  }, [currentDriver])


  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
             control={form.control}
             name='name'
             render={({ field }) => (
               <FormItem className='space-y-1'>
                 <FormLabel>Name</FormLabel>
                 <FormControl>
                   <Input placeholder='Post Office' {...field} />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
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
     
    </DropdownMenu>

    <APIKeyComponent />
    <div className="flex flex-row justify-center">

            <Button className='mt-2 max-w-md 	align-self: center' loading={isLoading}>
              Create Account
            </Button>
    </div>

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



/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5GgTetouy7a
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { JSX } from 'react/jsx-runtime'

function APIKeyComponent() {
  const [apiKey, setApiKey] = useState<string>('a1b2c3d4e5f6g7h8i9j0') // ['a1b2c3d4e5f6g7h8i9j0']
  const generateRandomKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  return (
    <Card className="w-full mt-20 mb-10">
      <CardHeader>
        <CardTitle>API Key</CardTitle>
        <CardDescription>
          Your API key provides access to our platform. Keep it secure and do not share it with anyone.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="font-medium">Your API Key:</div>
          <Button
            className="text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            size="icon"
            variant="ghost"
          >
            <CopyIcon className="h-4 w-4" />
            <span className="sr-only">Copy API key</span>
          </Button>
        </div>
        <div className="relative">
          <Input className="pr-10" readOnly type="text" value={apiKey} />
          <Button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            size="icon"
            variant="ghost"
          >
            <CopyIcon className="h-4 w-4" />
            <span className="sr-only">Copy API key</span>
          </Button>
        </div>
      </CardContent>
      <div className="m-6">
        <Button onClick={() => {
          setApiKey(generateRandomKey())
      
        }}>Generate New Key</Button>
        </div>
      
    </Card>
  )
}

function CopyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}
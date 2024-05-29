"use client"

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
import { MapContainer, Marker, TileLayer } from 'react-leaflet'


import { useMap, useMapEvents } from "react-leaflet"
import L from 'leaflet'

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

  const icon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  
    const [ drivers ] = useState<PostalUser[]>([])
    const [_profile, setProfile] = useState<PostalUser | null>(null)

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
          title: 'Profile created!',
          description: `Profile ${res.data.firstName} ${res.data.lastName} has been created.`,
        })
        props.onSubmitCallback()
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


  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0.0, lng: 0.0 });

  function CurrentLocationButton() {
    const map = useMap();

    const handleClick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latlng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setView(latlng, 13); // Adjust zoom level as needed
          L.marker(latlng, { icon }).addTo(map);
          setLocation(latlng);
        }, (error) => {
          console.error(error);
          toast({
            title: 'Geolocation Error',
            description: 'Unable to retrieve your location.',
          });
        });
      } else {
        toast({
          title: 'Geolocation Not Supported',
          description: 'Your browser does not support geolocation.',
        });
      }
    };

    useEffect(() => {
      const control = new L.Control({ position: 'bottomright' });

      control.onAdd = () => {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        const button = L.DomUtil.create('button', '', div);
        button.innerHTML = 'Use Current Location';
        button.style.backgroundColor = 'white';
        button.style.border = '2px solid rgba(0,0,0,0.2)';
        button.style.cursor = 'pointer';
        button.style.padding = '5px';
        button.onclick = handleClick;
        return div;
      };

      control.addTo(map);

      return () => {
        control.remove();
      };
    }, [map]);

    return null;
  }
  function LocationMarker({ setLocation }: { setLocation: (location: { lat: number; lng: number }) => void }) {
    useMapEvents({
      click(e) {
        setLocation(e.latlng);
      },
    });
    return null;
  }


  const defaultLocation = { lat: 9.145, lng: 40.4897 }; // Ethiopia's coordinates
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <MapContainer
                center={defaultLocation}
                zoom={6}
                style={{ height: '300px', width: '100%' }}
              >
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {location && <Marker position={location} icon={icon} />}
                <LocationMarker setLocation={setLocation} />
                <CurrentLocationButton />
              </MapContainer>
            <Button className='mt-2' loading={isLoading}>
              Create Account
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

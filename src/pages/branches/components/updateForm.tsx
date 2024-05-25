"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import { useMapEvents } from "react-leaflet"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' // Import Leaflet CSS
const profileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  password: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  firstName: '',
  lastName: '',

  phone: '',
  password: '',
}


import L from 'leaflet'

import 'leaflet/dist/leaflet.css' // Import Leaflet CSS

import { HTMLAttributes, useEffect, useState } from 'react'
import axios from 'axios'
import { Checkbox } from '@/components/ui/checkbox'

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {
  onSubmitCallback: () => void,
  updatedId?: string
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
    name: z.string().min(1, { message: 'Please enter the branch name' }),
  })

export function UpdateForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
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

  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0.0, lng: 0.0 });
  const [locationId, setLocationId] = useState<string | null>(null);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const [isMainOffice, setIsMainOffice] = useState(false);
  const [position, setPosition] = useState("BASIC")

  const defaultLocation = { lat: 9.145, lng: 40.4897 }; // Ethiopia's coordinates
  const [currentLocation, setCurrentLocation] = useState<any>([9.019363454825323, 38.802153782900255]);

  // Function to handle the user's current position
  const showPosition = (position: any) => {
    setCurrentLocation([position.coords.latitude, position.coords.longitude]);
  };
  const icon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const [branchLocations, setBranchLocations] = useState<{ name: string, location: { lat: number, lng: number } }[]>([]);
  const getBranches = async () => {
    try {
      const res = await axios.get('https://postoffice.gebeta.app/branch');
      console.log(res.data);
      res.data.forEach((branch: any) => {
        const newBranches = branchLocations;
        newBranches.push({ name: branch.name, location: { lat: branch.location.latitude, lng: branch.location.longitude } });
        console.log({ newBranches });
        setBranchLocations(newBranches);
      });
    } catch (error) {
      console.error(error);
    }
  };

  function LocationMarker({ setLocation }: { setLocation: (location: { lat: number; lng: number }) => void }) {
    useMapEvents({
      click(e) {
        setLocation(e.latlng);
      },
    });
    return null;
  }

  useEffect(() => {
    getBranches();
  }, []);


  /*
----------
  */

  const createLocation = async () => {
    await axios.post(import.meta.env.VITE_API_URL + '/location', {
      name: form.getValues().name,
      coords: {
        latitude: location.lat,
        longitude: location.lng
      }
    }).then(res => {
      console.log(res.data, "from location -----------------");
      setLocationId(res.data[0].id)
    }).catch((err: unknown) => {
      console.error(err, "------------fails here.")
      toast({
        title: 'Something went wrong!',
        description: `Error: ${err}`,
      })
      return []
    });

  }


  const updateBranch = async () => {
    await axios.put(import.meta.env.VITE_API_URL + `/branch?id=${props.updatedId}`, {
      name: form.getValues().name,
      mainOffice: isMainOffice,
      locationId: locationId
    }).then(res => {
      setCurrentBranch(res.data)
      toast({
        title: 'Branch created!',
        description: `Branch ${res.data.name} has been created.`,
      });
    }).catch((err: unknown) => {
      console.error(err)
      toast({
        title: 'Something went wrong!',
        description: `Error: ${err}`,
      })
      return []
    });
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
    if (branches.length > 0) {
      createLocation()
    }
  }, [branches])

  useEffect(() => {
    if (locationId) {
      updateBranch()
    }
  }, [locationId])

  useEffect(() => {
    if (currentBranch) {
      props.onSubmitCallback()
    }
  }, [currentBranch])


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
                    <Input placeholder='....' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='space-y-1'>
              <FormLabel>Select Location</FormLabel>

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
                {
                  branchLocations.map((branch, index) => (
                    <Marker key={index} position={branch.location} icon={icon}>
                      <Popup className='flex flex-row justify-between gap-3'>
                        <p>{branch.name}</p>
                        <Button
                          onClick={() => {
                            setLocation(branch.location);
                          }} className='mt-2' >Select</Button>
                      </Popup>
                    </Marker>
                  ))
                }
              </MapContainer>
            </div>

            <div className='flex flex-row items-center gap-3'>
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                onChange={() => {
                  setIsMainOffice(!isMainOffice);
                }}
              >
                Main Branch
              </label>
            </div>


            <Button className='mt-2' loading={isLoading}>
              Update Branch
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

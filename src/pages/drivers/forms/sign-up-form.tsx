"use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import { HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/custom/button';
import { PasswordInput } from '@/components/custom/password-input';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { PostalUser } from '@/hooks/authProvider';
import { toast } from '@/components/ui/use-toast';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultLocation = { lat: 9.145, lng: 40.4897 }; // Ethiopia's coordinates

const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {
  onSubmitCallback: () => void;
  isDriver: boolean;
}

type Branch = {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter your name' }),
    phone: z
      .string()
      .min(1, { message: 'Please enter your phone' })
      .min(9, { message: 'Phone number is not valid' })
      .max(9, { message: 'Phone number is not valid' }),
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
  });

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [branches, setBranches] = useState<Branch[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [_profile, setProfile] = useState<PostalUser | null>(null);
  const [currentDriver, setCurrentDriver] = useState<PostalUser | null>(null);
  const [_position, _setPosition] = useState("BASIC");
  const [location, setLocation] = useState<string | null>(null);
  const [_branchLocations, _setBranchLocations] = useState<{ id: string, name: string, location: { lat: number, lng: number } }[]>([]);

  const handleBranchFetch = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + '/branch');
      setBranches(res.data as Branch[]);
      setFilteredBranches(res.data as Branch[]); // Set filtered branches on load
    } catch (err: unknown) {
      console.error(err);
      toast({
        title: 'Something went wrong!',
        description: `Error: ${err}`,
      });
    }
  };

  const createProfile = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/profile/signup', {
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
      });
      return res.data;
    } catch (err: unknown) {
      console.error(err, "------------fails here.");
      toast({
        title: 'Something went wrong!',
        description: `Error: ${err}`,
      });
      return null;
    }
  };

  const createDriver = async (profileId: string) => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/employee', {
        profileId,
        branchId: location,
        isDriver: props.isDriver,
        permissionLevel: PermissionLevel.Employee
      });
      setCurrentDriver(res.data);
    } catch (err: unknown) {
      console.error(err);
      toast({
        title: 'Something went wrong!',
        description: `Error: ${err}`,
      });
    }
  };

  const onSubmit = async (_data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await handleBranchFetch();

    const newProfile = await createProfile();
    if (newProfile) {
      setProfile(newProfile);
      await createDriver(newProfile.id);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleBranchFetch(); // Ensure branches are fetched on load
  }, []);

  useEffect(() => {
    if (currentDriver) {
      props.onSubmitCallback();
    }
  }, [currentDriver]);

  useEffect(() => {
    const filtered = branches.filter(branch =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBranches(filtered);
  }, [searchQuery, branches]);

  enum PermissionLevel {
    Employee = "LEMAJ",
    Manager = "LIMDYALEW",
    Admin = "MASTER",
  }

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
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Employee Permission Level</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Permission Level</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  {Object.keys(PermissionLevel).map((permissionLevel) => (
                    <DropdownMenuRadioItem key={permissionLevel} value={permissionLevel}>
                      {permissionLevel}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <div className='space-y-1'>
              <FormLabel>Search Branch</FormLabel>
              <Input
                placeholder='Search for a branch'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
                {filteredBranches.map((branch, index) => (
                  <Marker key={index} position={{ lat: branch.location.latitude, lng: branch.location.longitude }} icon={icon}>
                    <Popup className='flex flex-row justify-between gap-3'>
                      <p>{branch.name}</p>
                      <Button
                        onClick={() => setLocation(branch.id)}
                        className='mt-2'
                        loading={isLoading}
                      >
                        Select
                      </Button>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <Button className='mt-2' loading={isLoading} type="submit">
              Create Account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

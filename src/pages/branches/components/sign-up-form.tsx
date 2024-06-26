"use client";

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/custom/button';
import { useMapEvents, MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

import L from 'leaflet';

import { HTMLAttributes, useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {
  onSubmitCallback: () => void;
}

type Branch = {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter the branch name' }),
});

export function SignUpForm({ className, onSubmitCallback, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const [branches, setBranches] = useState<Branch[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0.0, lng: 0.0 });
  const [locationId, setLocationId] = useState<string | null>(null);
  const [_currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const [isMainOffice, setIsMainOffice] = useState(false);

  const defaultLocation = { lat: 9.145, lng: 40.4897 }; // Ethiopia's coordinates
  const icon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleBranchFetch = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + '/branch');
      setBranches(res.data as Branch[]);
    } catch (err: unknown) {
      console.error(err);
      toast({
        title: 'Something went wrong!',
        description: `Error: ${err}`,
      });
    }
  };

  const createLocation = async () => {
    await axios.post(import.meta.env.VITE_API_URL + '/location', {
      name: methods.getValues().name,
      coords: {
        latitude: location.lat,
        longitude: location.lng
      }
    }).then(res => {
      console.log(res.data, "from location -----------------");
      setLocationId(res.data[0].id);
    }).catch((err: unknown) => {
      console.error(err, "------------fails here.");
      toast({
        title: 'Something went wrong!',
        description: `Error: ${err}`,
      });
      return [];
    });
  };

  const createBranch = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/branch', {
        name: methods.getValues().name,
        mainOffice: isMainOffice,
        locationId: locationId
      });
      setCurrentBranch(res.data);
      toast({
        title: 'Branch created!',
        description: `Branch ${res.data.name} has been created.`,
      });
      onSubmitCallback();
    } catch (err: unknown) {
      console.error(err);
      toast({
        title: 'Something went wrong!',
        description: `Error: ${err}`,
      });
      setIsLoading(false);
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

  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    handleBranchFetch();
  }, []);

  useEffect(() => {
    const filtered = branches.filter(branch =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBranches(filtered);
  }, [searchQuery, branches]);

  const onSubmit = async (_data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await createLocation();
    await createBranch();
    setIsLoading(false);
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={methods.control}
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
              <FormLabel>Search Branch</FormLabel>
              <Input
                placeholder='Search for a branch'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className='space-y-1'>
              <FormLabel>Select Location</FormLabel>
              <div style={{ height: '300px', position: 'relative' }}>
                <MapContainer
                  center={defaultLocation}
                  zoom={6}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {location && <Marker position={location} icon={icon} />}
                  <LocationMarker setLocation={setLocation} />
                  {branches.map((branch, index) => (
                    <Marker key={index} position={{ lat: branch.location.latitude, lng: branch.location.longitude }} icon={icon}>
                      <Popup className='flex flex-row justify-between gap-3'>
                        <p>{branch.name}</p>
                        <Button onClick={() => setLocation({ lat: branch.location.latitude, lng: branch.location.longitude })} className='mt-2'>
                          Select
                        </Button>
                      </Popup>
                    </Marker>
                  ))}
                  <CurrentLocationButton />
                </MapContainer>
              </div>
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
            <Button className='mt-2' loading={isLoading} type="submit">
              Create Branch
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

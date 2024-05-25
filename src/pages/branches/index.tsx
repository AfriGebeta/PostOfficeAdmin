import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useAuth } from '@/hooks/authProvider'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' // Import Leaflet CSS
import { Button } from '@/components/ui/button'
import L from 'leaflet'
import UpdateBranch from './UpdateBranch'

export type Branch = {
  name: string
  mainOffice: boolean
  location: {
    latitude: number
    longitude: number
  }
  id: string
}

export default function Branches() {
  const { user } = useAuth()
  const [ branches, setBranches ] = useState<Branch[]>([])
  const defaultLocation = { lat: 9.145, lng: 40.4897 }; // Ethiopia's coordinates
  const [updating, setUpdating] = useState<Branch>();

  const icon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const [branchLocations, setBranchLocations] = useState<Branch[]>([]);
  const getBranches = async () => {
    try {
      const res = await axios.get('https://postoffice.gebeta.app/branch');
      console.log(res.data);
      res.data.forEach((branch: any) => {
        const newBranches = branchLocations;
        newBranches.push({ name: branch.name, location: { latitude: branch.location.latitude, longitude: branch.location.longitude }, mainOffice: branch.mainOffice, id: branch.id});
        console.log({ newBranches });
        setBranchLocations(newBranches);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleTaskFetch = async () => {
    console.log("getting Branches -------------")
    let fetchBranches = await axios(import.meta.env.VITE_API_URL + '/branch').then(res => {
      console.log(res.data, "from Branches======----");
      return res.data as Branch[]
    }).catch(err => {
      console.error(err)
      return []
    });
    
    console.log(fetchBranches, "from empl======", user?.id);
    
    setBranches(fetchBranches)
  }

  useEffect(() => {
    handleTaskFetch()
  }, [])


  useEffect(() => {
    getBranches();
  }, []);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          {/* <p>{JSON.stringify(branches[0], null, 2)}</p> */}
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back! {user?.firstName}</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of of all the post office branches in the system.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={branches} columns={columns} />
        </div>
        <div className='flex justify-end flex-col p-4 gap-3'>
          <p>View Branches on map...</p>
        {!updating && <MapContainer
                center={defaultLocation}
                zoom={6}
                style={{ height: '600px', width: '100%' }}
              >
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* <LocationMarker setLocation={setLocation} /> */}
                {
                  branchLocations.map((branch, index) => (
                    <Marker key={index} position={{lat:branch.location.latitude, lng: branch.location.longitude}} icon={icon}>
                      <Popup className='flex flex-row justify-between gap-3'>
                        <p>{branch.name}</p>
                        <Button
                          onClick={() => {
                            setUpdating(branch);
                          }} className='mt-2' >Update details</Button>
                      </Popup>
                    </Marker>
                  ))
                }
              </MapContainer>}
        </div>
        {updating && <UpdateBranch showDialog={updating} setShowDialog={setUpdating}/>}
      </LayoutBody>
    </Layout>
  )
}

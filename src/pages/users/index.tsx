import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useAuth } from '@/hooks/authProvider'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { EmployeeUser } from '../drivers'

export default function users() {
  const { user } = useAuth()
  const [ drivers, setdrivers ] = useState<EmployeeUser[]>([])
  const handleTaskFetch = async () => {
    console.log("getting users -------------")
    let fetchusers = await axios(import.meta.env.VITE_API_URL + '/profile').then(res => {
      console.log(res.data, "from users======----");
      return res.data as EmployeeUser[]
    }).catch(err => {
      console.error(err)
      return []
    });
    
    console.log(fetchusers, "from empl======", user?.id);
    
    fetchusers = fetchusers.filter(empl => !empl.isDriver)
    setdrivers(fetchusers.map(empl=> {
      return {
        ...empl,
        //@ts-ignore
        ...empl.profile,
        userId: empl.id
      }
    }))
  }

  useEffect(() => {
    handleTaskFetch()
  }, [])
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
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back! {user?.firstName}</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of of all the people in the system.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={drivers} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  )
}

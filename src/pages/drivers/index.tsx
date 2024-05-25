import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { PostalUser,  useAuth } from '@/hooks/authProvider'
import axios from 'axios'
import { useState, useEffect } from 'react'

export type EmployeeUser = PostalUser & {
  branch: string
  isDriver: boolean
}

export default function Drivers() {
  const { user } = useAuth()
  const [ drivers, setdrivers ] = useState<EmployeeUser[]>([])
  const handleTaskFetch = async () => {
    console.log("getting drivers -------------")
    let fetchEmployees = await axios(import.meta.env.VITE_API_URL + '/employee').then(res => {
      console.log(res.data, "from drivers======----");
      return res.data as EmployeeUser[]
    }).catch(err => {
      console.error(err)
      return []
    });
    
    console.log(fetchEmployees, "from empl======", user?.id);
    
    fetchEmployees = fetchEmployees.filter(empl => empl.isDriver)
    setdrivers(fetchEmployees.map(empl=> {
      return {
        ...empl,
        //@ts-ignore
        ...empl.profile,
        employeeId: empl.id
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

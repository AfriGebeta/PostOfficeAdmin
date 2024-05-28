import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { useAuth } from '@/hooks/authProvider'
// import axios from 'axios'
import {  useState } from 'react'
// import { Task } from './data/schema'
// import { SignUpForm } from './forms/user-auth-form'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import Trans from "../../assets/trans.png"
import Tele from "../../assets/tele.svg"

export type EService = {
  name: string
  logo: string
  orgPhone: string
  orgEmail: string
}

export default function Tasks() {
  const { user } = useAuth()
  const [ _tasks, _setTasks ] = useState<EService[]>([
    {
      name: "Transportation Ministry",
      logo: Trans,
      orgPhone: "8829",
      orgEmail: "transporationMinistry@gov.et"
    },
    {
      name: "Ethio Telecom",
      logo: Tele,
      orgPhone: "998",
      orgEmail: "EthioTel@gov.et"
    }
  ])
  

  // const availableTasks = tasks.filter((task) => (task.status === 'waiting' || task.status === 'en-route') || task.assignedTo === undefined)
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
              Here&apos;s a list of of all the EServices Registered in the system.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={_tasks} setData={_setTasks} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  )
}


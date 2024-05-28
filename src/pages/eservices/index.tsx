import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { useAuth } from '@/hooks/authProvider'
import axios from 'axios'
import {  useEffect, useState } from 'react'
import { Task } from './data/schema'
import { SignUpForm } from './forms/user-auth-form'

export default function Tasks() {
  const { user } = useAuth()
  const [ _tasks, setTasks ] = useState<Task[]>([])
  const handleTaskFetch = async () => {
    console.log("ppap", import.meta.env.VITE_API_URL)
    const ftechtasks = await axios(import.meta.env.VITE_API_URL + '/package').then(res => {
      console.log(res.data, "These are the tasks")
      return res.data as Task[]
    }).catch(err => {
      console.error(err)
      return []
    });
    
    ftechtasks.forEach(task => {
      task.trackingNumber = "1Z9R5W90P22" + Math.floor(Math.random() * 100000).toString()
    });
    //@ts-ignore
    const filteredTasks = ftechtasks.filter((task) => task.specification.documenttype === "NID")
    setTasks(filteredTasks)
  }

  useEffect(() => {
    handleTaskFetch()
  }, [])

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
      <h2 className='text-2xl font-bold tracking-tight'>Welcome back! {user?.firstName}</h2>
        <p className='text-muted-foreground'>Create a new E-service provider with an api-key</p>
        <div className='flex flex-row justify-end mb-4'>

        </div>
      <SignUpForm />
      </LayoutBody>
    </Layout>
  )
}


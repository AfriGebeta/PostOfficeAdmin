import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import { PostalUserRole, useAuth } from '@/hooks/authProvider'
import { useEffect } from 'react'

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const { user, setUser } = useAuth()
  const navigator = useNavigate()

  useEffect(() => {
    console.log('User:', user, "useEffect triggered")
    if(user){
      console.log('User is logged in:', user)
    }else{
      console.log('User is not logged in')
      let localUser
    if (user) {
      localUser = user
    } else {
      const result = localStorage.getItem('user')
      if (result) {
        localUser = JSON.parse(result)
        console.log('Local user:', localUser)
        console.log("setting user to 0000", {...localUser, role: localUser.Employee[0].permissionLevel})
        setUser({...localUser, role: localUser.Employee[0].permissionLevel})
      }
    }
    if (localUser) {
      switch (localUser?.Employee[0].permissionLevel) {
        case PostalUserRole.master:
          navigator('/dashboard')
          break
        case PostalUserRole.Limd_yalew:
          navigator('/mail')
          break
        case PostalUserRole.basic:
          navigator('/403')
          break
        default:
          navigator('/welcome')
      }
    } else {
      navigator('/sign-in')
    }
    }
  }
  , [user])
  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Outlet />
      </main>
    </div>
  )
}

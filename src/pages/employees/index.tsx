import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { users } from './data/tasks'
import { PostalUserRole, useAuth } from '@/hooks/authProvider'

export default function Employees() {
  const { user } = useAuth()
  const validUsers = users.filter((user) => user.role === PostalUserRole.master || user.role === PostalUserRole.Limd_yalew)
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <Search />
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
          <DataTable data={validUsers} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  )
}

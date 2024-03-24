import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { IconArrowForward, IconBell, IconCactus } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import { Layout, LayoutHeader } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Search } from '@/components/search'

export default function ComingSoon() {
  const notifications = [
    {
      title: 'Get an Id that works for you!',
      description: 'Accepted everywhere',
    },
    {
      title: 'Your fayda digital Id is only a few clicks away!',
      description: 'Takes less than 5 minutes to get started',
    },
    {
      title: 'Shipped in cooperation with EthioPost',
      description: 'Fast and reliable delivery service',
    },
  ]

  return (
    <Layout>
    {/* ===== Top Heading ===== */}
    <LayoutHeader>
      {/* <TopNav links={topNav} /> */}
      <Search />
      <div className='ml-auto flex items-center space-x-4'>
        <ThemeSwitch />
        <UserNav />
      </div>
    </LayoutHeader>
    <div className='h-svh'>
      <div className='m-auto flex flex-row h-2/3 w-full items-center justify-center gap-2'>
        <Card className='w-96 h-[30rem] '>
          <CardHeader>
            <CardTitle>National Id</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className=' flex items-center space-x-4 rounded-md border p-4'>
              <IconBell />
              <div className='flex-1 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  Push Notifications
                </p>
                <p className='text-sm text-muted-foreground'>
                  Send notifications to device.
                </p>
              </div>
              <Switch />
            </div>
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'
                >
                  <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
                  <div className='space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      {notification.title}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>
              <IconArrowForward className='mr-2 h-4 w-4' /> Check it out
            </Button>
          </CardFooter>
        </Card>
        <Card className='w-96 h-[30rem] flex flex-col justify-center gap-4'>
          <CardContent className='flex flex-col justify-between items-center gap-16'>
            <h1 className='text-4xl font-bold leading-tight'>Coming Soon 👀</h1>
            <CardTitle>Others coming soon</CardTitle>
            <CardDescription>Please be patient with us, we're working very hard to add other partnerships.</CardDescription>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>
              <IconCactus className='mr-2 h-4 w-4' /> 
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    </Layout>
  )
}

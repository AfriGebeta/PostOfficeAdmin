import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'

import React from 'react'
import { SignUpForm } from './forms/user-auth-form'
import { useAuth } from '@/hooks/authProvider'
import { EService } from '.'

export default function SendNew({
  setEServices,
  eServices,
}: {
  setEServices: React.Dispatch<React.SetStateAction<EService[]>>
  eServices: EService[]
}) {
  const [showDialog, setShowDialog] = React.useState(false)
  const { user } = useAuth()

  const onSubmitCallback = (newEService: EService) => {
    setEServices([...eServices, newEService])
    setShowDialog(false)
  }
  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button variant='default'>Create</Button>
        </DialogTrigger>
        <DialogContent>
          <div className='mb-4 flex items-center justify-center'>
            <h1 className='text-xl font-medium'>VirtualPo</h1>
          </div>

          <h2 className='text-2xl font-bold tracking-tight'>Welcome back! {user?.firstName}</h2>
        <p className='text-muted-foreground'>Create a new E-service provider with an api-key</p>
      <SignUpForm onSubmitCallback={onSubmitCallback} />
        </DialogContent>
      </Dialog>
    </>
  )
}

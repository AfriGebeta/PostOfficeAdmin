import { Card } from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/custom/button'

import postOfficeLogo from "../../assets/post_logo.png";
import React from 'react'
import { UserAuthForm } from './forms/user-auth-form'

export default function SendNew() {
  const [showDialog, setShowDialog] = React.useState(false)
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

          <div className='flex flex-col space-y-2 text-left'>
            <p className='text-sm text-muted-foreground'>
              Fill the form below 
              to send package
            </p>
          </div>
          <UserAuthForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

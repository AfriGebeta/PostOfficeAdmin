import { Card } from '@/components/ui/card'
import { SignUpForm } from './forms/sign-up-form'

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

export default function Createuser() {
  const [showDialog, setShowDialog] = React.useState(false)

  const handleSaveChanges = () => {
    toast({
      title: 'Changes saved',
      description: 'The user has been successfully added to the database',
    })

    setShowDialog(false)
  }
  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button variant='default'>Create</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new user</DialogTitle>
            <DialogDescription>
                Fill out the form below to add a new user to the database
            </DialogDescription>
          </DialogHeader>
          {/* <div className='gap-4 py-4 flex flex-col items-start justify-start'>
              <div className='flex flex-row items-center justify-start  gap-4'> */}
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
            <div className='mb-4 flex items-center justify-center'>
            <img
              src={postOfficeLogo}
              alt='VirtualPO Admin'
              className='w-16 h-16 mr-2'
              style={{ borderRadius: '50%'}}
            />
              <h1 className='text-xl font-medium'>VirtualPO Admin</h1>
            </div>
            <Card className='p-6'>
              <div className='mb-2 flex flex-col space-y-2 text-left'>
                <h1 className='text-lg font-semibold tracking-tight'>
                  Create an account
                </h1>
                <p className='text-sm text-muted-foreground'>
                  Enter the user's phone and password to create an account. <br />
                  {/* Already have an account?{' '}
                  <Link
                    to='/sign-in'
                    className='underline underline-offset-4 hover:text-primary'
                  >
                    Sign In
                  </Link> */}
                </p>
              </div>
              <SignUpForm onSubmitCallback={handleSaveChanges} isDriver={false}/>
              <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
                By creating an account, you agree to our{' '}
                <a
                  href='/terms'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href='/privacy'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Privacy Policy
                </a>
                .
              </p>
            </Card>
          </div>
          {/* </div>
            </div> */}
          {/* <DialogFooter>
            <Button type='submit' onClick={handleSaveChanges}>
              Save changes
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  )
}

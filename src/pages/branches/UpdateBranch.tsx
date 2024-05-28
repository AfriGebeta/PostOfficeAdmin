import { Card } from '@/components/ui/card'


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/custom/button'

import postOfficeLogo from "../../assets/post_logo.png";
import React from 'react'
import { UpdateForm } from './components/updateForm'
import { Branch } from '.'

export default function UpdateBranch({showDialog, setShowDialog}: {showDialog: Branch, setShowDialog: React.Dispatch<React.SetStateAction<any>>}) {
  

  const handleSaveChanges = () => {
    toast({
      title: 'Changes saved',
      description: 'The Branch has been successfully added to the database',
    })

    setShowDialog(false)
    window.location.reload()
  }
  return (
    <>
      <Dialog open={!!showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button variant='default'>Create</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle>Add a new Branch</DialogTitle>
            <DialogDescription>
                Fill out the form below to add a new Branch to the database
            </DialogDescription> */}
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
                  Update Branch Details
                </h1>
                <p className='text-sm text-muted-foreground'>
                  Enter the Branch's phone and password to update its details. <br />
                  {/* Already have an account?{' '}
                  <Link
                    to='/sign-in'
                    className='underline underline-offset-4 hover:text-primary'
                  >
                    Sign In
                  </Link> */}
                </p>
              </div>
              <UpdateForm onSubmitCallback={handleSaveChanges} updatedId={showDialog.id}/>
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

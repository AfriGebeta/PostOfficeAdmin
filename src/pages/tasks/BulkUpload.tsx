import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import React from 'react'
import { BulkUploadForm } from './forms/uploadBulk';

export default function BullkUpload() {
  const [showDialog, setShowDialog] = React.useState(false)
  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button variant='default'>Upload Bulk</Button>
        </DialogTrigger>
        <DialogContent>
          <div className='mb-4 flex items-center justify-center'>
            <h1 className='text-xl font-medium'>VirtualPo</h1>
          </div>

          <div className='flex flex-col space-y-2 text-left'>
            <p className='text-sm text-muted-foreground'>
              Upload file
            </p>
          </div>
          <BulkUploadForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

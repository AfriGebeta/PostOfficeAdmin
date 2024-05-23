import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {

  const names = [
    "Alemu Bekele",
    "Yohannes Dinku",
    "Mulugeta Zeleke",
    "Almaz Dinku",
    "Genet Tadesse",
    "Tesfaye Bekele",
    "Haile Bekele",
    "Dawit Dinku"
  ];
  return (
    <div className='space-y-8'>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Alemu Bekele</p>
          <p className='text-sm text-muted-foreground'>
            Alemu.Bekele@email.com
          </p>
        </div>
        <div className='ml-auto font-medium'>+Birr 1,999.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarImage src='/avatars/02.png' alt='Avatar' />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Yohannes Dinku</p>
          <p className='text-sm text-muted-foreground'>johannes.dinku@email.com</p>
        </div>
        <div className='ml-auto font-medium'>+Birr 39.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/03.png' alt='Avatar' />
          <AvatarFallback>GT</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Genet Tadesse</p>
          <p className='text-sm text-muted-foreground'>
          genny.tadesse@email.com
          </p>
        </div>
        <div className='ml-auto font-medium'>+Birr 299.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>DD</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Dawit Dinku</p>
          <p className='text-sm text-muted-foreground'>ddinku@email.com</p>
        </div>
        <div className='ml-auto font-medium'>+Birr 99.00</div>
      </div>
      {/* <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/05.png' alt='Avatar' />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Sofia Davis</p>
          <p className='text-sm text-muted-foreground'>sofia.davis@email.com</p>
        </div>
        <div className='ml-auto font-medium'>+Birr 39.00</div>
      </div> */}
    </div>
  )
}

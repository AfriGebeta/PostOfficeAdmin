import { Task, TaskCategory } from './schema'

export const tasks: Task[] = [
  {
    id: 'MAIL-7419',
    details: 'From: Jennifer Rodgers -> To: Jeremy Galloway',
    status: 'waiting',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'MAIL-4471',
    details: 'From: Amanda Bates -> To: John Martin',
    status: 'en-route',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-6625',
    details: 'From: Paul Bowman -> To: Sarah Mcconnell',
    status: 'waiting',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-5727',
    details: 'From: Tiffany Klein -> To: Steven Ponce',
    status: 'waiting',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-3358',
    details: 'From: Kaitlin Gutierrez -> To: Rebecca Benson',
    status: 'en-route',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-5140',
    details: 'From: Michael Castillo -> To: Beth Martinez',
    status: 'waiting',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'MAIL-2260',
    details: 'From: Benjamin Levy -> To: James Blevins',
    status: 'waiting',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'MAIL-6298',
    details: 'From: Tammy Austin -> To: Michael Dean',
    status: 'en-route',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-8368',
    details: 'From: Kyle Jensen -> To: Keith Oneill',
    status: 'waiting',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-6114',
    details: 'From: Heather Mcdonald -> To: Lauren Richmond',
    status: 'waiting',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-2310',
    details: 'From: David Hanson -> To: Tina Barnes',
    status: 'waiting',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-5643',
    details: 'From: Steven Gutierrez -> To: Gloria Flores',
    status: 'waiting',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-8669',
    details: 'From: Troy James -> To: William Roberts',
    status: 'delivered',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'MAIL-5220',
    details: 'From: Lynn Smith -> To: Cynthia Cohen',
    status: 'waiting',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-3937',
    details: 'From: Timothy Morris -> To: Jesus Hartman',
    status: 'en-route',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-2446',
    details: 'From: Haley Chaney -> To: Calvin Blanchard',
    status: 'delivered',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-5203',
    details: 'From: Gregory Adams -> To: Rebekah Adams',
    status: 'delivered',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-7833',
    details: 'From: Christopher Klein -> To: Chelsea Hampton',
    status: 'delivered',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-2666',
    details: 'From: Donna Gordon -> To: Robert Williams',
    status: 'waiting',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-4455',
    details: 'From: John Jones -> To: William Bentley',
    status: 'delivered',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-3263',
    details: 'From: Troy Weber -> To: Bradley Jones',
    status: 'delivered',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'MAIL-4081',
    details: 'From: Cheryl Watkins -> To: Andrew Perkins',
    status: 'waiting',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-6688',
    details: 'From: Shannon Joyce -> To: Brittney Cisneros',
    status: 'waiting',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-3478',
    details: 'From: John Higgins -> To: Kristine Clark',
    status: 'delivered',
    label: 'documentation',
    priority: 'low',
  }
] as Task[]

const sources = [
  {
    name: 'National ID',
    icon: 'src/assets/nid.svg',
  },
  {
    name: 'Transport ministry',
    icon: 'src/assets/trans.png',
  },
  {
    name: 'Immigration',
    icon: 'src/assets/im.jpeg',
  },

]

tasks.forEach((task, index) => {
  // give randm category
  task.category =
    Object.values(TaskCategory)[index % Object.keys(TaskCategory).length]
  // assign random driver to some of the tasks
  if (index % 3 === 0) {
    const names = [
      'Rob Brown',
      'John Doe',
      'Jason Brydon',
      'Jane Doe',
      'Alice Smith',
      'Bob Brown',
      'Charlie Brown',
      'David Doe',
    ]
    task.assignedTo = names[Math.floor(Math.random() * names.length)]
  }
})

// add phone number to each task row starting with +251920 and has 6 digits
tasks.forEach((task) => {
  task.phoneNumber = `+251920${Math.floor(Math.random() * 1000000)}`
  task.trackingNumber = `1Z9R5W90P22${Math.floor(Math.random() * 100000)}`

  // assign random source
  task.source = sources[Math.floor(Math.random() * sources.length)]
}
)
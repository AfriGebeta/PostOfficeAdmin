import { Task, TaskCategory } from './schema'

export const tasks: Task[] = [
  {
    id: 'MAIL-7419',
    details: 'From: Jennifer Rodgers -> To: Jeremy Galloway',
    status: 'station',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'MAIL-4471',
    details: 'From: Amanda Bates -> To: John Martin',
    status: 'pickedup',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-6625',
    details: 'From: Paul Bowman -> To: Sarah Mcconnell',
    status: 'station',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-5727',
    details: 'From: Tiffany Klein -> To: Steven Ponce',
    status: 'station',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-3358',
    details: 'From: Kaitlin Gutierrez -> To: Rebecca Benson',
    status: 'pickedup',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-5140',
    details: 'From: Michael Castillo -> To: Beth Martinez',
    status: 'station',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'MAIL-2260',
    details: 'From: Benjamin Levy -> To: James Blevins',
    status: 'station',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'MAIL-6298',
    details: 'From: Tammy Austin -> To: Michael Dean',
    status: 'pickedup',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-8368',
    details: 'From: Kyle Jensen -> To: Keith Oneill',
    status: 'station',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-6114',
    details: 'From: Heather Mcdonald -> To: Lauren Richmond',
    status: 'station',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-2310',
    details: 'From: David Hanson -> To: Tina Barnes',
    status: 'station',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-5643',
    details: 'From: Steven Gutierrez -> To: Gloria Flores',
    status: 'station',
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
    status: 'station',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-3937',
    details: 'From: Timothy Morris -> To: Jesus Hartman',
    status: 'pickedup',
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
    status: 'station',
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
    status: 'station',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-6688',
    details: 'From: Shannon Joyce -> To: Brittney Cisneros',
    status: 'station',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-3478',
    details: 'From: John Higgins -> To: Kristine Clark',
    status: 'delivered',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-3231',
    details: 'From: Katherine Ball -> To: Janet Turner',
    status: 'delivered',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-7040',
    details: 'From: Danielle Williams -> To: Victoria Smith',
    status: 'pickedup',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-4300',
    details: 'From: Michael Moore -> To: Daniel Pollard',
    status: 'delivered',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-9113',
    details: 'From: Robert Stone -> To: Victoria Brooks',
    status: 'delivered',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-1253',
    details: 'From: Jason Thompson -> To: John Chapman',
    status: 'pickedup',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-2982',
    details: 'From: Anthony Park -> To: John Schneider',
    status: 'delivered',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-1165',
    details: 'From: Melissa Schultz -> To: Lisa Garcia',
    status: 'pickedup',
    label: 'bug',
    priority: 'low',
  },
  {
    id: 'MAIL-5179',
    details: 'From: Mark Garcia -> To: Keith Kerr',
    status: 'pickedup',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-7028',
    details: 'From: Maria Humphrey -> To: Darrell Andrade',
    status: 'pickedup',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-5722',
    details: 'From: Scott Bradford -> To: Carrie Clark',
    status: 'pickedup',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-5314',
    details: 'From: Phillip Hernandez -> To: Jessica Bradley',
    status: 'pickedup',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-9313',
    details: 'From: Jacqueline Simmons -> To: Andrew Garcia',
    status: 'station',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'MAIL-5158',
    details: 'From: Theresa Murray -> To: Jennifer Clark',
    status: 'station',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-3385',
    details: 'From: Jose Cruz -> To: Mary Romero',
    status: 'station',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-3431',
    details: 'From: Abigail Scott -> To: Brian Griffith',
    status: 'pickedup',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-3810',
    details: 'From: Scott Daniel -> To: Courtney Frey',
    status: 'delivered',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'MAIL-9852',
    details: 'From: Amber Weeks -> To: Jerome Fisher',
    status: 'station',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-5572',
    details: 'From: Thomas Shah -> To: Lauren Wright',
    status: 'station',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'MAIL-9675',
    details: 'From: Elizabeth Montgomery -> To: Pamela Robinson',
    status: 'station',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-8120',
    details: 'From: Todd Stephens -> To: Sarah Montes',
    status: 'delivered',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-4265',
    details: 'From: Carol Garrett -> To: Diana Dunlap',
    status: 'station',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-8546',
    details: 'From: Amy Hernandez -> To: Douglas Sullivan',
    status: 'station',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-9036',
    details: 'From: Darrell Norman -> To: Kathryn Copeland',
    status: 'station',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'MAIL-8330',
    details: 'From: Scott Francis -> To: Patricia Anthony',
    status: 'delivered',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'MAIL-1032',
    details: 'From: Christy Vazquez -> To: Theresa Case',
    status: 'delivered',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-2638',
    details: 'From: Travis Leblanc -> To: Elizabeth Johnson',
    status: 'pickedup',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-3619',
    details: 'From: Nicholas Russo -> To: Charles Buchanan',
    status: 'delivered',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'MAIL-4054',
    details: 'From: Elizabeth Barnett -> To: David Humphrey',
    status: 'station',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-8643',
    details: 'From: Wendy Hall -> To: Jessica Miller',
    status: 'station',
    label: 'bug',
    priority: 'low',
  },
  {
    id: 'MAIL-4040',
    details: 'From: Christopher Beasley -> To: Blake Crawford',
    status: 'station',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-4473',
    details: 'From: James Smith -> To: Matthew Harvey',
    status: 'station',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-6471',
    details: 'From: Andrew Bruce -> To: Heather Kim',
    status: 'delivered',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-5825',
    details: 'From: Jessica Mcgrath -> To: Erica Chambers',
    status: 'pickedup',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-3568',
    details: 'From: Monica Vargas -> To: Michael Lee',
    status: 'station',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'MAIL-4002',
    details: 'From: Matthew Cisneros -> To: Wendy Rodriguez',
    status: 'pickedup',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-9052',
    details: 'From: Jessica Newton -> To: Edward Shaffer',
    status: 'station',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'MAIL-5904',
    details: 'From: Allison White -> To: Daniel Reyes',
    status: 'delivered',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-1602',
    details: 'From: Matthew Potter -> To: James Hatfield',
    status: 'station',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'MAIL-7130',
    details: 'From: Karen Singleton -> To: Megan Wolfe',
    status: 'station',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'MAIL-9330',
    details: 'From: Sara Calhoun -> To: Andrew Fleming',
    status: 'pickedup',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'MAIL-6378',
    details: 'From: Tracy Long -> To: Kayla Wilson',
    status: 'station',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-9803',
    details: 'From: Bianca Ayala -> To: Eric Tucker',
    status: 'pickedup',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-7194',
    details: 'From: Lauren Murphy -> To: Brittney Fox',
    status: 'delivered',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'MAIL-8779',
    details: 'From: Raven Morton -> To: Victor Gonzalez',
    status: 'delivered',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-2140',
    details: 'From: John Lowery -> To: Jason Thomas',
    status: 'delivered',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-4231',
    details: 'From: Christopher Lane -> To: Amanda Smith',
    status: 'delivered',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-3938',
    details: 'From: Melissa Flores -> To: Cindy Hill',
    status: 'delivered',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-5352',
    details: 'From: Dustin Guerrero -> To: Joseph Neal',
    status: 'delivered',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'MAIL-4449',
    details: 'From: Brittany Brown -> To: Andrew Sexton',
    status: 'delivered',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-8655',
    details: 'From: Sandra Martin -> To: Kristina Schultz',
    status: 'pickedup',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-1378',
    details: 'From: Thomas Jacobson -> To: Jesse George',
    status: 'delivered',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'MAIL-2449',
    details: 'From: Claudia Robertson -> To: Paul Burns',
    status: 'station',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-1507',
    details: 'From: Nathan Bowman -> To: Amanda Pitts',
    status: 'station',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-9469',
    details: 'From: Alyssa Savage -> To: Brian Chapman',
    status: 'station',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-5547',
    details: 'From: Lance Thomas -> To: Keith Henderson',
    status: 'station',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-1315',
    details: 'From: Tina Bond -> To: Theresa Gill',
    status: 'pickedup',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-1683',
    details: 'From: Rachel Cook -> To: Kenneth Sanders',
    status: 'pickedup',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-1432',
    details: 'From: Aaron Powers -> To: Katelyn James',
    status: 'pickedup',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-6250',
    details: 'From: James Sutton -> To: Michael Meyer',
    status: 'delivered',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-8757',
    details: 'From: Sabrina Parker -> To: Edward Jones',
    status: 'station',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-5420',
    details: 'From: Lindsey Duffy -> To: Carl Pearson',
    status: 'delivered',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-9286',
    details: 'From: Frank Henderson -> To: Dennis King',
    status: 'station',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'MAIL-3650',
    details: 'From: Erin Wallace -> To: Elizabeth George',
    status: 'delivered',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-8308',
    details: 'From: Karl Holloway -> To: Jean Griffin',
    status: 'delivered',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-3694',
    details: 'From: Jasmine Henderson -> To: Alicia Hall',
    status: 'station',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-5329',
    details: 'From: Nancy Perry -> To: Derek Hernandez',
    status: 'delivered',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'MAIL-4734',
    details: 'From: Jessica Cook -> To: Debra Moon',
    status: 'pickedup',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'MAIL-2063',
    details: 'From: Joseph Hart -> To: Eddie Valencia',
    status: 'station',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'MAIL-6047',
    details: 'From: Emily Jones -> To: James Gonzales',
    status: 'station',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-4564',
    details: 'From: Laura James -> To: Ashley Thomas',
    status: 'station',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'MAIL-7703',
    details: 'From: Christina Jefferson -> To: Stephanie Campbell',
    status: 'pickedup',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-1090',
    details: 'From: Daniel Torres -> To: Mary Ferguson',
    status: 'delivered',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-6092',
    details: 'From: Deborah Wright -> To: Joyce Wells',
    status: 'station',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'MAIL-7871',
    details: 'From: Roger Brown -> To: Anthony Faulkner',
    status: 'station',
    label: 'bug',
    priority: 'low',
  },
  {
    id: 'MAIL-3323',
    details: 'From: Kathryn Bailey -> To: Jonathan Nguyen',
    status: 'pickedup',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'MAIL-1786',
    details: 'From: Justin Ward -> To: Chad Gibson',
    status: 'pickedup',
    label: 'feature',
    priority: 'high',
  },
] as Task[]


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
}
)
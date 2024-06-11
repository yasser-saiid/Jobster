import { TbWorldSearch } from 'react-icons/tb'
import { MdOutlineAddchart } from 'react-icons/md'
import { FaChartBar } from 'react-icons/fa'
import { FaRegAddressCard } from 'react-icons/fa6'

export const links = [
  {
    id: 1,
    text: 'stats',
    url: '/',
    icon: <FaChartBar />,
  },
  {
    id: 2,
    text: 'all jobs',
    url: 'all-jobs',
    icon: <TbWorldSearch />,
  },
  {
    id: 3,
    text: 'add job',
    url: 'add-job',
    icon: <MdOutlineAddchart />,
  },
  {
    id: 4,
    text: 'profile',
    url: 'profile',
    icon: <FaRegAddressCard />,
  },
]

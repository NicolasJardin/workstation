import { GiTomato } from 'react-icons/gi'

export default function TopBar() {
  return (
    <div className="h-14 flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-200 dark:from-gray-800 dark:to-gray-500">
      <GiTomato className="cursor-pointer" color="#8B2C0B" size={25} />
    </div>
  )
}

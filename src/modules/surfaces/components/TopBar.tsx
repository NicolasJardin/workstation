'use client'
import { useThemeStore } from '@/stores'
import { GiTomato } from 'react-icons/gi'
import { MdDarkMode } from 'react-icons/md'

export function TopBar() {
  const { changeTheme } = useThemeStore()

  return (
    <div className="h-14 flex items-center justify-center space-x-40 bg-gradient-to-br from-gray-400 to-gray-200 dark:from-gray-800 dark:to-gray-500">
      <GiTomato className="cursor-pointer" color="#B91C1C" size={30} />

      <MdDarkMode onClick={changeTheme} className="cursor-pointer" size={30} />
    </div>
  )
}

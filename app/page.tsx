import Header from '@/components/common/header.component';
import Menu from '@/components/explore/menu.component';
import Image from 'next/image'

export default function Home() {
  return (
    <div className=" dark:bg-black dark:text-white  h-screen w-screen">
      <Header />
      <Menu />
    </div>
  )
}

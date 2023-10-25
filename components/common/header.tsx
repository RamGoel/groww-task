import React from 'react'
import Image from 'next/image'
const Header = () => {
  return (
    <div>
      <div>
        <Image src="/images/logo.png" alt="logo" width={100} height={100} />
      </div>
    </div>
  )
}

export default Header
import React from 'react'

const Logo = ({name}:{name:string}) => {
  return (
      <div className='bg-brandblue'>
          {name.substring(2).toUpperCase()}
    </div>
  )
}

export default Logo
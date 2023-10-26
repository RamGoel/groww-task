import React from 'react'

const Info = ({title, value}:any) => {
  return (
      <div className='rounded border-2 p-3 border-greylight mr-3 ' style={{minWidth:200 }}>
          <p className='text-black font-semibold dark:text-white text-sm'>{title}</p>
          <p className='text-black dark:text-white text-md'>{value}</p>
    </div>
  )
}

export default Info
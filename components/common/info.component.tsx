import React from 'react'

const Info = ({title, value}:any) => {
  return (
      <div className='rounded-lg border-2 p-3 w-100 border-greylight mr-2 ' style={{minWidth:200 }}>
          <p className='text-black font-semibold dark:text-white text-sm'>{title}</p>
          <p className='text-black dark:text-white text-md'>{value}</p>
    </div>
  )
}

export default Info
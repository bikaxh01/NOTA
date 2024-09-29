import React, { ReactNode } from 'react'

function Template({children}:{children:ReactNode}) {
  return (
    <div className=' h-screen p-6 flex justify-center'>
        {children}
    </div>
  )
}

export default Template
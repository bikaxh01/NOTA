import React, { ReactNode } from 'react'

function HomePageLayout({children}:{children:ReactNode}) {
  return (
    <div>
        {children}
    </div>
  )
}

export default HomePageLayout
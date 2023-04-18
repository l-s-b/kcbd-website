import React from 'react'
import Pattern from './Pattern'

export default function PageContainer({showPattern, children}) {

  return (
    <div className="vw100 flex centerX bg2 rel z20 hMin100">
        <Pattern p={showPattern}/>
        {children}
    </div>
  )
}

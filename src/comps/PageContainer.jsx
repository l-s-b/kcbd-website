import React from 'react'
import PolkaPattern from './PolkaPattern'

export default function PageContainer({showPattern, rotate, children}) {

  return (
    <div className="vw100 flex centerX bg2 rel z20 hMin100">
        <PolkaPattern p={showPattern} r={rotate} />
        {children}
    </div>
  )
}

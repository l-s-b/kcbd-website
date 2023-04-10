import React from 'react'

export default function TabLink({id, className, to, children}) {
  return (
    <a
        id={id}
        className={className}
        href={to}
        target="_blank"
        rel="noopener noreferrer nofollow"
    >
        {children}
    </a>
  )
}

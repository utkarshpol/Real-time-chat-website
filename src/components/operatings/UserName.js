import React from 'react'
import './style.css'
import { useParams } from 'react-router-dom'

export default function UserName() {
  const {user1,user2} = useParams()
  return (
    <div className='Username'>
      {user1}
    </div>
  )
}

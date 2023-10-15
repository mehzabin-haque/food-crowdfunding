import React from 'react'
import Featured from '../components/Featured'
import Navbar from '../components/Navbar'

type Props = {}

const feature = (props: Props) => {
  return (
    <div>
        <Navbar />
        <Featured />
    </div>
  )
}

export default feature
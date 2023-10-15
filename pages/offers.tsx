import React from 'react'
import Offer from '../components/Offer'
import Navbar from '../components/Navbar'

type Props = {}

const offers = (props: Props) => {
  return (
    <div>
        <Navbar />
        {/* <div className='h-full'> */}
        <Offer />
        {/* </div> */}
    </div>
  )
}

export default offers
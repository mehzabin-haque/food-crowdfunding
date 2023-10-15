import React from 'react'
import RecipeForm from '../components/RecipeForm'

type Props = {}

const recipe = (props: Props) => {
  return (
    <div className='p-40 bg-gray-100'>
        <RecipeForm />
    </div>
  )
}

export default recipe
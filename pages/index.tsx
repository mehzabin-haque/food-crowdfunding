
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'

import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Featured from '../components/Featured'
import Offer from '../components/Offer'
import Notification from '../components/Notification'
import Layout from './layout'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const { data: session, status } = useSession()
  return (
    <main>
      <Layout>
      <Slider/>
      <Featured/>
      <Offer/>
      </Layout>
    </main>
  )
}


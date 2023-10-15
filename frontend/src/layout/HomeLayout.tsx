import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Container from '../components/Container'
type Props = {}

const HomeLayout = (props: Props) => {
  return (
    <Container>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Container>
  )
}

export default HomeLayout
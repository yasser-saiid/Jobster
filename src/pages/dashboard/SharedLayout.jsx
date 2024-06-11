import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { SidebarFixed, SidebarDynamic, Navbar } from '../../components'
import { useState } from 'react'

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <Wrapper>
      <Navbar openSidebar={openSidebar} />
      <SidebarDynamic
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      />
      <section className='dashboard-content'>
        <SidebarFixed isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  height: 100vh;

  .dashboard-content {
    height: calc(100vh - 5rem);
  }

  @media (min-width: 992px) {
    .dashboard-content {
      display: grid;
      grid-template-columns: 300px 1fr;
    }
  }
`

export default SharedLayout

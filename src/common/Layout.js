import React from 'react'
import Footer from '../screens/admin/components/common/Footer';

const Layout = ({children}) => {

  return (
          <>
            <main className="flex justify-center h-full antialiased bg-gray_95 ">
              {children}
            </main>
            <Footer/>
          </>

  )
}

export default Layout
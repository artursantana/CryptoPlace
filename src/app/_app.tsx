import Layout from './layout'

import React from 'react'

const _app = ({Component, pageProps}: any) => {
  return (
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
}

export default _app

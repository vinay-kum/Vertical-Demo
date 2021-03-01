import Head from 'next/head'
import React, { useContext } from 'react'
import { CommonContext } from '../../providers/commonContexts'

function Layout(props) {
  const { siteConfig, channelToken } = useContext(CommonContext)
  return (
    <div>
      <Head>
        <script type="text/javascript" src="https://static.oracle.com/cdn/cec/api/oracle-ce-ui-2.1.js"></script>
        {siteConfig && siteConfig.id && 
          <>
            <link rel="logo icon" href={`https://sandbox-oce0002.ocecdn.oraclecloud.com/content/published/api/v1.1/assets/${siteConfig.fields.favicon.id}/native/favicon.ico?channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`} />
            <title>{siteConfig.fields.site_name}</title>
          </>
        }
      </Head>
      {props.children}
      {siteConfig && siteConfig.id && <style jsx global>
        {`
          body {
            color: ${siteConfig.fields.text_color};
          }
          .primaryBackground {
            background-color: ${siteConfig.fields.primary_color}
          }
          .primaryBackgroundHover :hover {
            background-color: ${siteConfig.fields.primary_color};
            opacity: ${0.6}
          }
          .primaryColor{
            color: ${siteConfig.fields.primary_color}
          }
          .borderColor{
            border-color: ${siteConfig.fields.primary_color}
          }
        `}
      </style>}
    </div>
  )
}

export default Layout

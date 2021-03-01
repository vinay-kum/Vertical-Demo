// import Head from 'next/head'
import { useEffect, useContext } from 'react'
import HeaderMenu from '../components/HeaderMenu/HeaderMenu'
import { CommonContext } from '../providers/commonContexts'
import { getCategories, getSiteConfiguration } from '../services/service'

export default function Home({getSiteConfig, categories}) {
  const { siteConfig, setSiteConfig, channelToken } = useContext(CommonContext)

  useEffect(() => {
    setSiteConfig(getSiteConfig)
  }, [getSiteConfig])

  return (
    <div>
      {/* <Head>
        <script type="text/javascript" src="https://static.oracle.com/cdn/cec/api/oracle-ce-ui-2.1.js"></script>
      </Head> */}
     { siteConfig && siteConfig.id &&
      <>
        <HeaderMenu categories={categories} logoUrl={`https://sandbox-oce0002.ocecdn.oraclecloud.com/content/published/api/v1.1/assets/${siteConfig.fields.logo.id}/native/flowserve-logo.png?channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`} />
        <img style={{width: '100%'}} src={`https://sandbox-oce0002.ocecdn.oraclecloud.com/content/published/api/v1.1/assets/${siteConfig.fields.landing_page.id}/Large/home-page.png?format=jpg&type=responsiveimage&channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`} alt="" />
        {/* <img style={{width: '100%'}} src={`https://sandbox-oce0002.ocecdn.oraclecloud.com/content/published/api/v1.1/assets/${siteConfig.fields.footer.id}/Large/footer.png?format=jpg&type=responsiveimage&channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`} alt="" /> */}
      </>
     }
    </div>
  )
}

export async function getStaticProps() {
  const getSiteConfig = await getSiteConfiguration()
  const categories = await getCategories(getSiteConfig.fields.categories)
  return {
    props: {
      getSiteConfig, categories
    }
  }
}

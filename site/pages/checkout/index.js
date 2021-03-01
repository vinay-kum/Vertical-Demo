import { useEffect, useContext } from 'react'
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'
import { CommonContext } from '../../providers/commonContexts'
import { getCategories, getSiteConfiguration } from '../../services/service'
import CheckoutPage from '../../components/CheckoutPage/CheckoutPage';

function Checkout({ getSiteConfig, categories }) {
  const { siteConfig, setSiteConfig, channelToken } = useContext(CommonContext)

  useEffect(() => {
    setSiteConfig(getSiteConfig)
  }, [getSiteConfig])

    return (
      <div>
        { siteConfig && siteConfig.id &&
          <>
            <HeaderMenu categories={categories} logoUrl={`https://sandbox-oce0002.ocecdn.oraclecloud.com/content/published/api/v1.1/assets/${siteConfig.fields.logo.id}/native/flowserve-logo.png?channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`} />
          </>
        }
        <CheckoutPage />
        { siteConfig && siteConfig.id &&
          <img style={{width: '100%'}} src={`https://sandbox-oce0002.ocecdn.oraclecloud.com/content/published/api/v1.1/assets/${siteConfig.fields.footer.id}/Large/footer.png?format=jpg&type=responsiveimage&channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`} alt="" />
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

export default Checkout

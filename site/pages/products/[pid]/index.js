import { useEffect, useContext } from 'react'
import ProductDetails from '../../../components/ProductDetails/ProductDetails'
import { getCategories, getSiteConfiguration, getProducts, getProductById } from '../../../services/service'
import HeaderMenu from '../../../components/HeaderMenu/HeaderMenu'
import { CommonContext } from '../../../providers/commonContexts'
// import Head from 'next/head'

function Product({product, getSiteConfig, categories}) {
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
          </>
        }
        <ProductDetails product={product} />
        { siteConfig && siteConfig.id &&
          <img style={{width: '100%'}} src={`https://sandbox-oce0002.ocecdn.oraclecloud.com/content/published/api/v1.1/assets/${siteConfig.fields.footer.id}/Large/footer.png?format=jpg&type=responsiveimage&channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`} alt="" />
        }
      </div>
    )
}

export async function getStaticPaths() {

  const products = await getProducts()
  
  // Get the paths we want to pre-render based on products
  const paths = products.map((product) => `/products/${product.id}`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /products/1, then params.id is 1
    const product = await getProductById(params.pid)
    const getSiteConfig = await getSiteConfiguration()
    const categories = await getCategories(getSiteConfig.fields.categories)
  
    // Pass post data to the page via props
    return { props: { product, getSiteConfig, categories } }
  }

export default Product

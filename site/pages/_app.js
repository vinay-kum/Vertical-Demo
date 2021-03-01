import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { CommonProvider } from '../providers/commonContexts'
import Layout from '../components/Layout/Layout'

function MyApp({ Component, pageProps }) {
  return  <CommonProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
        </CommonProvider>
}

export default MyApp

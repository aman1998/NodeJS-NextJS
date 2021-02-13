import 'antd/dist/antd.css'
import { Layout} from 'antd'
import Header from '../layout/header'
import Footer from '../layout/footer'
import {Sidebar1, Sidebar2} from '../layout/sidebar'

const { Content } = Layout;

// Обертка для страницы
const PageTemplate = ({children, setType, setStatus, setSearchClient, setOrder }) => {
  return (
    <Layout>
      <Header 
        setOrder={setOrder}
      />
      <Layout>
      <Sidebar1 />
      <Content style={{ padding: '0 50px', height: '100vh' }}>
        {children}
      </Content>
      <Sidebar2 
        setType={setType}
        setStatus={setStatus}
        setSearchClient={setSearchClient}
      />
      </Layout>
      <Footer />
    </Layout>
  )
}

export default PageTemplate



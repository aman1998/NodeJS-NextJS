import {useEffect, useState} from 'react'
import 'antd/dist/antd.css'
import { Breadcrumb, Spin} from 'antd'
import axios from '../axios/axios'
import List from '../components/list/list'
import styles from './Home.module.css'
import PageTemplate from '../components/template/pageTemplate'
import Head from 'next/head'

const Home = ({orders: serverOrders}) => {
  const [orders, setOrders] = useState(serverOrders)
  const [type, setType] = useState('')
  const [searchClient, setSearchClient] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [order, setOrder] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let url = `/orders/?checkStatus=${status}&checkType=${type}`
    setLoading(true)
    if(searchClient) {
      url = `/orders/?searchClient=${searchClient}&checkStatus=${status}&checkType=${type}`
    }
    axios.get(url)
    .then (({data}) => {
      setOrders(data)
      setLoading(false)
      setSuccess(true)
    })
    .catch(e => {
      setLoading(false)
      setFailed(true)
    })
  }, [status, type, searchClient, order])

  return (
    <>
    <Head>
      <title>Orders page</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <PageTemplate 
      setType={setType}
      setStatus={setStatus}
      setSearchClient={setSearchClient}
      setOrder={setOrder}
      >
      {loading ? 
        <Spin className={styles.loader}/> :
        success ?
        <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <List orders={orders}/> 
        </> : <div>error</div> 
      }
    </PageTemplate>
    </>
  )
}

export default Home

export async function getStaticProps(context) {
  let orders;
  await axios.get('/orders')
      .then (({data}) => {
        orders = data
      })
  return {
    props: {orders}
  }
}
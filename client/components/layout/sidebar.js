import { useState } from 'react'
import 'antd/dist/antd.css'
import { Layout, Menu, Input, Select  } from 'antd'
import { UserOutlined, 
          LaptopOutlined, 
          NotificationOutlined,
        } from '@ant-design/icons'

const { Sider } = Layout
const { Option } = Select

import styles from './styles.module.css'

export const Sidebar2 = ({setType, setStatus, setSearchClient}) => {
  const [search, setSearch] = useState(false)

  const handleChangeType = (value) => {
    setType(value)
  }

  const handleChangeStatus = (value) => {
    setStatus(value)
  }

  const handleSearchClient = (e) => {
    if(search) {
      clearTimeout(search)
    }
    setSearch(setTimeout(() => {
      setSearchClient(e.target.value)
    }, 500))
  }

  return (
      <Sider className={styles.sidebar}>
        <div>Clients</div>
        <Input 
          onChange={handleSearchClient}
          placeholder="search" 
          prefix={<UserOutlined />} 
          className={styles.input}/>
        <div>Status</div>
        <Select defaultValue="All" style={{ width: 120 }} onChange={handleChangeStatus} className={styles.input}>
          <Option value="">All</Option>
          <Option value="done">done</Option>
          <Option value="progress">progress</Option>
        </Select>
        <div>Type</div>
        <Select defaultValue="All" style={{ width: 120 }} onChange={handleChangeType} className={styles.input}>
          <Option value="">All</Option>
          <Option value="cash">cash</Option>
          <Option value="card">card</Option>
        </Select>
      </Sider>
  )
}

export const Sidebar1 = () => {
  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['2']}
        style={{ height: '100%' }}
      >
          <Menu.Item key="1" icon={<UserOutlined />}>option1</Menu.Item>
          <Menu.Item key="2" icon={<LaptopOutlined />}>option2</Menu.Item>
          <Menu.Item key="3" icon={<NotificationOutlined/>}>option3</Menu.Item>
      </Menu>
    </Sider>
  )
}

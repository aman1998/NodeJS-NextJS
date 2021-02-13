import 'antd/dist/antd.css'
import { Layout, Button, Modal, Spin, Input, Select  } from 'antd'
import {useState} from 'react'
import { PlusOutlined, SettingFilled, UserOutlined } from '@ant-design/icons'
import axios from '../../axios/axios'
import styles from './styles.module.css'

const { Header } = Layout;
const { Option } = Select;

const HeaderComponent = ({setOrder}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [nameClient, setNameClient] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [validation, setValidation] = useState(false)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log(nameClient, status, type)
    if(nameClient && status && type) {
      setLoading(loading)
      axios.post('order', {nameClient, status, type})
      .then(() => {
        setLoading(false)
        setSuccess(true)
        setOrder(true)
      })
      .catch(() => {
        setLoading(false)
        setFailed(true)
      })
    }
    else {
      setValidation(true)
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setLoading(false)
    setSuccess(false)
    setFailed(false)
    setValidation(false)
  };

  return (
      <Header className={styles.header}>
        <div className={styles.logo}>Axel</div>
        <Button type="link" block ghost icon={<SettingFilled />} className={styles.btn}>
          Administration
        </Button>
        <Button type="link" block ghost icon={<SettingFilled />} className={styles.btn}>
          Settings
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Create order
        </Button>
        <Modal title="Add client" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {loading ? 
        <Spin className={styles.loader}/> : 
        success ? 
        <div>success</div> : 
        failed ? <div>error</div> :
          <div className={styles.modalContent}>
            <Input 
              onChange={(e) => setNameClient(e.target.value)}
              placeholder="name" 
              prefix={<UserOutlined />} 
              className={styles.modalInput}
            />
            <Select 
              defaultValue="Status" 
              onChange={(value) => setStatus(value)} 
              className={styles.modalInput}
              >
              <Option value="done">done</Option>
              <Option value="progress">progress</Option>
            </Select>
            <Select 
              defaultValue="Type" 
              onChange={(value) => setType(value)} 
              className={styles.modalInput}
              >
              <Option value="cash">cash</Option>
              <Option value="card">card</Option>
            </Select>
            {validation ? <div className={styles.validation}>Заполните данные</div> : ''}
          </div>
      }
        </Modal>
      </Header>
      
  )
}

export default HeaderComponent
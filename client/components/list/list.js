import styles from './style.module.css'
import { Table, Tag, Space } from 'antd';

const List = ({orders}) => {
  const columns = [
    {
      title: 'Client',
      dataIndex: 'nameClient',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    }
  ];

  
  return (
      <section className="site-layout-content" className={styles.content}>
        <Table 
          dataSource={orders} columns={columns} 
          rowKey="date" 
          />
      </section>
  )
}

export default List
import React from 'react';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import { Icon, Select, Button, notification } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { useStore } from 'react-redux';

const openNotification = () => {
  notification.open({
    message: 'Notification',
    description:
      'Please fill all the selects.',
  });
};

export default function Banner() {

    let store = useStore();
    
    const { Option } = Select;

    function handleTreeType (value : any) {
        store.dispatch({
            type: 'SET_TREE_TYPE',
            text: value,
        });
    }

    function handleDataType (value : any) {
        store.dispatch({
            type: 'SET_DATA_TYPE',
            text: value,
        });
    }

    function handleMaxDegree (value : any) {
        store.dispatch({
            type: 'SET_MAX_DEGREE',
            text: value,
        });
    }

    function handleChangeView() {
      let check = store.getState()
      if(check.treeType !== '' && check.dataType !== '' && check.maxDegree !== ''){
        if(check.treeType === 'btree'){
          store.dispatch({
            type: 'CREATE_BTREE_OBJECT',
            dataType: check.dataType,
            maxDegree: check.maxDegree,
          });
        }
        if(check.treeType === 'bplustree'){
          store.dispatch({
            type: 'CREATE_BPLUSTREE_OBJECT',
            dataType: check.dataType,
            maxDegree: check.maxDegree,
          });
        }
        store.dispatch({
          type: 'SET_VIEW_TREE',
          text: true,
        });
      }else{
        openNotification();
      }
    }

  return (
    <section className="page banner-wrapper">
      <ScrollElement
        className="page"
        id="banner"
        playScale={0.9}
      >
        <QueueAnim className="banner-text-wrapper" type={['right', 'left']}
          ease={['easeOutQuart', 'easeInOutQuart']} delay={500} key="banner">
            <h2 key="1">SELECT YOUR <p>BTREE</p></h2>
            <Select
                key="2"
                showSearch
                style={{ width: 300 }}
                onChange={handleTreeType}
            >
                <Option value="btree">B Tree</Option>
                <Option value="bplustree">B+ Tree</Option>
            </Select>
            <h2 key="3">SELECT YOUR <p>DATA TYPE</p></h2>
            <Select
                key="4"
                showSearch
                style={{ width: 300 }}
                onChange={handleDataType}
            >
                <Option value="number">Number</Option>
                <Option value="string">String</Option>
            </Select>
            <h2 key="5">SELECT YOUR <p>MAX DEGREE</p></h2>
            <Select
                key="6"
                showSearch
                style={{ width: 300 }}
                onChange={handleMaxDegree}
            >
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
            </Select>
            <h2 key="7">SEE THE MAGIC</h2>
            <Button key="8" className="start-button clearfix" type="primary" onClick={handleChangeView}>Go</Button>
        </QueueAnim>
        <Icon type="down" className="down" />
      </ScrollElement>
    </section>
  );
}

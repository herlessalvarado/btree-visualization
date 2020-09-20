import React from 'react';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import { Icon, Select, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { useStore } from 'react-redux';

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
      }
    }

  return (
    <section className="page banner-wrapper">
      <ScrollElement
        className="page"
        id="banner"
        playScale={0.9}
      >
        <QueueAnim className="banner-text-wrapper" type="left" delay={1000} key="banner">
            <h2 key="h2">SELECT YOUR <p>BTREE</p></h2>
            <Select
                showSearch
                style={{ width: 300 }}
                onChange={handleTreeType}
            >
                <Option value="btree">B Tree</Option>
                <Option value="bplustree">B+ Tree</Option>
            </Select>
            <h2 key="h2">SELECT YOUR <p>DATA TYPE</p></h2>
            <Select
                showSearch
                style={{ width: 300 }}
                onChange={handleDataType}
            >
                <Option value="number">Number</Option>
                <Option value="string">String</Option>
            </Select>
            <h2 key="h2">SELECT YOUR <p>MAX DEGREE</p></h2>
            <Select
                showSearch
                style={{ width: 300 }}
                onChange={handleMaxDegree}
            >
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
            </Select>
            <h2 key="h2">SEE THE MAGIC</h2>
            {}
            <Button className="start-button clearfix" type="primary" onClick={handleChangeView}>Go</Button>
          {/* <p key="content">一个 UI 设计语言</p>
          <span className="line" key="line" />
          <div key="button1" className="start-button clearfix">
            <a>
              设计规范
            </a>
            <a>
              开发指引
            </a>
          </div> */}
        </QueueAnim>
        <Icon type="down" className="down" />
      </ScrollElement>
    </section>
  );
}

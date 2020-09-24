import React, { useEffect } from 'react';
import { Menu, Row, Col } from 'antd';
import store from '../store';

export default function Header() {

  const [bplus, setBplus ] = React.useState(false);

  useEffect(() => {
    store.subscribe(() => {
        store.getState().treeType === 'btree' ? setBplus(false) : setBplus(true)
    })
  }, [bplus])

    const menu = [
      <Menu mode="horizontal" defaultSelectedKeys={['github']} id="nav" key="nav">
        <Menu.Item key="github">
          <a href="https://github.com/herlessalvarado/btree-visualization" target="_blank">
            Github
          </a>
        </Menu.Item>
      </Menu>,
    ];

    return (
      <header id="header">
        <Row>
          <Col lg={4} md={5} sm={24} xs={24}>
            <a id="logo" onClick={() => window.location.reload(false)}>
            {bplus === false ? <span>BTree Visualizer</span> : <span>B+Tree Visualizer</span>}
            </a>
          </Col>
          <Col lg={20} md={19} sm={0} xs={0}>
            {menu}
          </Col>
        </Row>
      </header>
    );
  }

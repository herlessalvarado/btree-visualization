import React from 'react';
import { Menu, Row, Col } from 'antd';

export default function Header() {

    const menu = [
      <Menu mode="horizontal" defaultSelectedKeys={['home']} id="nav" key="nav">
        <Menu.Item key="home">
          首页
        </Menu.Item>
        <Menu.Item key="docs/spec">
          指引
        </Menu.Item>
        <Menu.Item key="docs/react">
          组件
        </Menu.Item>
        <Menu.Item key="docs/pattern">
          模式
        </Menu.Item>
        <Menu.Item key="docs/resource">
          资源
        </Menu.Item>
      </Menu>,
    ];

    return (
      <header id="header">
        <Row>
          <Col lg={4} md={5} sm={24} xs={24}>
            <a id="logo">
              <span>BTree Visualizer</span>
            </a>
          </Col>
          <Col lg={20} md={19} sm={0} xs={0}>
            {menu}
          </Col>
        </Row>
      </header>
    );
  }

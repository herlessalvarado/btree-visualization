import React, { useEffect } from 'react';
import './assets/header.less';
import './assets/banner.less';
import './assets/tree.less';
import Header from './components/Header';
import Banner from './components/Banner';
import TreeVisualization from './components/TreeVisualization';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {

    const [viewTree, setViewTree ] = React.useState(false);

    useEffect(() => {
        store.subscribe(() => {
            store.getState().viewTree === false ? setViewTree(false) : setViewTree(true)
        })
    }, [viewTree])

    return (
        <Provider store={store}>
            <Header></Header>
            {viewTree === false ? <Banner></Banner> : <TreeVisualization></TreeVisualization>}
        </Provider>
    )
  }

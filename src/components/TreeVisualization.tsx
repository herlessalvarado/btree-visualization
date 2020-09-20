import React from 'react';
import * as d3 from 'd3';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import QueueAnim from 'rc-queue-anim';
import { Input, Button } from 'antd';
import { BPlusTree } from '../structures/BPlusTree/BPlusTree';
import { useStore } from 'react-redux';

function getD3Tree (btree: any) {
  const tree = d3.tree().size([1000, 50 - 200]).separation(() => (38 * 2));
  let BTREE = btree.toHierarchy(btree.getRoot());
  return tree(d3.hierarchy(BTREE));
}

export default function TreeVisualization() {

  let store = useStore();

  const margin = {
    top: 20, left: 0,
  };
  
  const settings = {
    strokeColor: '#29B5FF',
    width: 50,
    keyCellWidth: 38,
    keyCellHeight: 28,
    linkStyles: {
      plain: {
        stroke: 'black',
      },
      highlighted: {
        stroke: 'red',
      },
    },
    rectStyles: {
      plain: {
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2,
      },
      highlighted: {
        fill: 'lightblue',
        stroke: 'red',
        strokeWidth: 2,
      },
    },
  };

  const [root, setRoot] = React.useState<any>(getD3Tree(store.getState().treeObject));

  const [input, setInput] = React.useState<any>();

  const handleInput = (e: any) => {
    const newNumber = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(input)) {
      return;
    }
    if(newNumber > 99) {
      return;
    }
    setInput(newNumber);
  }

  const insertTree = () => {
    store.dispatch({
      type: 'INSERT_TREE',
      value: input,
    });
    console.log(store.getState().treeObject);
    setRoot(getD3Tree(store.getState().treeObject));
  }

  function nodes() {
    if (root) {
      const nodes = getNodes(root.descendants());
      return nodes;
    }
  };

  function links() {
    if (root) {
      const links = getLinks(root.descendants());
      return links;
    }
  };

  function arrows() {
    if(root) {
      const arrows = getArrows(root.leaves());
      return arrows;
    }
  }

  function getSVGParams(key: any, position: any, keys: any) {
    return {
      width: settings.keyCellWidth + (key.value.toString().length - 1) * 3,
      height: settings.keyCellHeight,
      x: position * (settings.keyCellWidth + (key.value.toString().length - 1) * 3)
              - ((settings.keyCellWidth + (key.value.toString().length - 1) * 3) / 2) * (keys ? keys.length : 2),
      y: -settings.keyCellHeight / 2,
      style: key.highlighted ? settings.rectStyles.highlighted : settings.rectStyles.plain,
    };
  };

  function getKeys(keys: any) {
    return keys.map((key: any, ii: any, keyArray: any) => (
      {
        text: key.value.toString(),
        position: ii,
        digits: key.value.toString().length,
        highlighted: key.highlighted,
        svgParams: getSVGParams(key, ii, keyArray),
      }
    )) || null;
  };

  function getNodes(descendants: any) {
    return descendants.map((d: any, i: any) => {
      const x = `${margin.left + d.x}px`;
      const y = `${margin.top - d.y}px`;
      return {
        id: i,
        keys: getKeys(d.data.leaves.keys),
        style: {
          transform: `translate(${x},${y})`,
        },
      };
    });
  };
  
  function getLinks(descendants: any) {
    return descendants.slice(1).map((d: any, i: any) => {
      const x = d.x + margin.left;
      const parentx = margin.left + d.parent.x;
      const y = margin.top - d.y;
      const parenty = margin.top - d.parent.y;
      const highlighted = d.data.leaves.keys.some((key: any) => key.highlighted) && d.parent.data.leaves.keys.some((key: any) => key.highlighted);
      return {
        id: i,
        d: `M${x},${y}L${parentx},${parenty}`,
        style: highlighted ? settings.linkStyles.highlighted : settings.linkStyles.plain,
      };
    });
  };

  function getArrows(leaves: any) {
    return leaves.map((d: any, i: any, a: any) => {
      const x = d.x;
      const y = margin.top - d.y;
      let xright = 0;
      if(a[i+1]){
        xright = a[i+1].x - (settings.keyCellWidth*2);
      }
      return {
        id: i,
        x1: `${x}`,
        y1: `${y}`,
        x2: `${xright}`,
        style: settings.linkStyles.plain,
      };
    })
  }

  function printArrows() {
    const items = [];
    for(const arrow of arrows()) {
      items.push(
        <g>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
          </defs>
          <line x1={arrow.x1} y1={arrow.y1} y2={arrow.y1} x2={arrow.x2} stroke="#000" 
  marker-end="url(#arrowhead)" />
        </g>
      )
    }
    items.pop();
    return items;
  }

  function printLinks(){
    const items = [];

    for (const link of links()) {
      items.push(<path className="link" d={link.d} style={link.style}></path>)
    }
    return items
  }

  function printNode(){
    const items = [];

    for (const node of nodes()) {
      items.push(<g className="node" key={node.id}>
        {node.keys.map((key: any, index: any) => {
          return(
            <g key={key.text}
              style={node.style}>
                <rect width={key.svgParams.width}
                height={key.svgParams.height}
                x={key.svgParams.x}
                y={key.svgParams.y}
                style={key.svgParams.style}></rect>
              <text
                dx={key.position * settings.keyCellWidth -
                  (settings.keyCellWidth/2) * (node.keys.length) + 10 - (key.digits - 2)*4}
                dy={4}
                style={node.textStyle}
              >
                { key.text }
              </text>
            </g>
          )
        }
      )}
      </g>)
    }
    return items
  }
  
    return (
      <section className="page banner-wrapper">
        {/* {store.getState().dataType === 'number' ? <input type="number" style={{
            marginTop: `80px`
          }} onChange={handleInput}></input> :
          <input type="text" style={{
            marginTop: `80px`
          }} onChange={handleInput}></input>} */}
          <div className="insert-container">
            <Input
              type="text"
              value={input | 0}
              onChange={handleInput}
              style={{ width: 100 }}
            />
            <Button type="primary" onClick={insertTree}>Insert</Button>
            {/* <Search
              className="insert-input"
              enterButton="Insert"
              size="large"
              onSearch={value => handleInput(value)}
            /> */}
          </div>
          <ScrollElement
        className="page"
        id="banner"
        playScale={0.9}
      >
        <QueueAnim className="banner-text-wrapper" type="left" delay={1000} key="banner">
        <svg
            className="svg"
            style={{
              width: `1000px`,
              height: `600px`
            }}
          >
            {printLinks()}
            { store.getState().treeObject instanceof BPlusTree ? printArrows() : null}
            {printNode()}
        </svg>
        </QueueAnim>
        </ScrollElement>
      </section>
    );
}

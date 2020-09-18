import React from 'react';
import * as d3 from 'd3';
import './App.css';
import { BTree } from './components/BTree/BTree';

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

function App() {

  const btree = new BTree<number>(3);
  
  for(let i=0; i<15; i++){
    btree.insert(i);
  }

  const BTREE = btree.toHierarchy(btree.getRoot());

  const tree = d3.tree().size([500, settings.width - 200]).separation(() => (settings.keyCellWidth * 2));

  const root = tree(d3.hierarchy(BTREE));

  function nodes() {
    if (root) {
      const nodes = getNodes(root.descendants());
      return nodes;
    }
    return undefined;
  };

  function links() {
    if (root) {
      const links = getLinks(root.descendants());
      return links;
    }
    return undefined;
  };

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

  function printLinks(){
    const items = []

    for (const link of links()) {
      items.push(<path className="link" d={link.d} style={link.style}></path>)
    }
    return items
  }

  function printNode(){
    const items = []

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
    <svg
        className="svg"
      >
        {printLinks()}
        {printNode()}
    </svg>
    );
}

export default App;

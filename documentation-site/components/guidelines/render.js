/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/no-weak-types */

// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';

// Figma returns global dictionaries for these, which are referenced by individual nodes
const Styles = React.createContext<any>();
const Vectors = React.createContext<any>();
const Images = React.createContext<any>();

// In Figma, everything is positioned relative to its closest ancestor Frame.
// Since we are positioning everything absolutely (CSS), we need to keep track
// of offsets created by nested Frames and Groups.
const Offset = React.createContext<{x: number, y: number}>({x: 0, y: 0});

function Node({node}: any) {
  if (node.visible === false) {
    return null;
  }

  if (node.type === 'TEXT') {
    return <TextNode node={node} />;
  }

  if (node.type === 'RECTANGLE' || node.type === 'ELLIPSE') {
    return <RectangleNode node={node} />;
  }

  if (
    node.type === 'VECTOR' ||
    node.type === 'INSTANCE' ||
    node.type === 'LINE' ||
    node.type === 'BOOLEAN_OPERATION'
  ) {
    return <VectorNode node={node} />;
  }

  if (node.type === 'GROUP') {
    return <GroupNode node={node} />;
  }

  if (node.type === 'FRAME') {
    return <FrameNode node={node} />;
  }

  console.log('This node type is unaccounted for:', node);
  return null;
}

function TextNode({node}: any) {
  const [css] = useStyletron();
  const offset = React.useContext(Offset);

  let Wrapper = ({children}) => <>{children}</>;

  if (
    node.characters.startsWith('http') ||
    node.characters.startsWith('https') ||
    node.characters.startsWith('www.')
  ) {
    Wrapper = ({children}) => (
      <a
        className={css({color: 'inherit'})}
        href={node.characters}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <div
      {...getDataIds(node)}
      className={css({
        position: 'absolute',
        top: node.absoluteBoundingBox.y - offset.y + 'px',
        left: node.absoluteBoundingBox.x - offset.x + 'px',
        width: node.absoluteBoundingBox.width + 'px',
        height: node.absoluteBoundingBox.height + 'px',
        color: getBackgroundColor(node),
        fontFamily: getFontFamily(node.style.fontFamily),
        fontWeight: node.style.fontWeight,
        fontSize: node.style.fontSize + 'px',
        lineHeight: node.style.lineHeightPx + 'px',
        textAlign: node.style.textAlignHorizontal.toLowerCase(),
      })}
    >
      <Wrapper>
        {[...node.characters].map((char, i) => {
          if (char === '\n') {
            return <br key={node.id + i} />;
          }

          // Characters can be styled individually...
          const styleOverrideKey = node.characterStyleOverrides[i];
          if (styleOverrideKey) {
            const foo = node.styleOverrideTable[styleOverrideKey];
            return (
              <span
                key={node.id + i}
                className={css({
                  color: foo.fills
                    ? getBackgroundColor({fills: foo.fills})
                    : 'inherit',
                  fontFamily: foo.fontFamily
                    ? getFontFamily(foo.fontFamily)
                    : 'inherit',
                  fontWeight: foo.fontWeight ? foo.fontWeight : 'inherit',
                  fontSize: foo.fontSize ? foo.fontSize + 'px' : 'inherit',
                  lineHeight: foo.lineHeightPx
                    ? foo.lineHeightPx + 'px'
                    : 'inherit',
                })}
              >
                {char}
              </span>
            );
          } else {
            return <span key={node.id + i}>{char}</span>;
          }
        })}
      </Wrapper>
    </div>
  );
}

function RectangleNode({node}: any) {
  const [css] = useStyletron();
  const offset = React.useContext(Offset);
  const images = React.useContext(Images);
  let backgroundImage = null;
  if (node.fills[0] && node.fills[0].type === 'IMAGE') {
    backgroundImage = images.meta.images[node.fills[0].imageRef];
  }
  return (
    <div
      {...getDataIds(node)}
      className={css({
        position: 'absolute',
        top: node.absoluteBoundingBox.y - offset.y + 'px',
        left: node.absoluteBoundingBox.x - offset.x + 'px',
        width: node.absoluteBoundingBox.width + 'px',
        height: node.absoluteBoundingBox.height + 'px',
        backgroundColor: getBackgroundColor(node),
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
        backgroundSize: backgroundImage ? 'cover' : null,
        backgroundRepeat: backgroundImage ? 'none' : null,
        border: getBorder(node),
        ...getBorderRadii(node),
        boxShadow: getBoxShadow(node),
      })}
    />
  );
}

function VectorNode({node}: any) {
  const [css] = useStyletron();
  const offset = React.useContext(Offset);
  const vectors = React.useContext(Vectors);

  const rawsvg = vectors[node.id];

  if (rawsvg) {
    const svgcss = css({
      position: 'absolute',
      top: node.absoluteBoundingBox.y - offset.y + 'px',
      left: node.absoluteBoundingBox.x - offset.x + 'px',
      overflow: 'visible',
    });

    const svg = rawsvg.replace(
      'xmlns="http://www.w3.org/2000/svg"',
      `xmlns="http://www.w3.org/2000/svg" class="${svgcss}"`,
    );

    return (
      <div
        {...getDataIds(node)}
        dangerouslySetInnerHTML={{
          __html: svg,
        }}
      />
    );
  } else {
    // This probably means we have something with no visuals, such as a spacer.
    console.log('This node has no svg', node);
    return null;
  }
}

function GroupNode({node}: any) {
  const [css] = useStyletron();
  const offset = React.useContext(Offset);
  return (
    <div
      {...getDataIds(node)}
      className={css({
        position: 'absolute',
        top: node.absoluteBoundingBox.y - offset.y + 'px',
        left: node.absoluteBoundingBox.x - offset.x + 'px',
        width: node.absoluteBoundingBox.width + 'px',
        height: node.absoluteBoundingBox.height + 'px',
      })}
    >
      <Offset.Provider
        value={{
          y: node.absoluteBoundingBox.y,
          x: node.absoluteBoundingBox.x,
        }}
      >
        {node.children.map(node => (
          <Node key={node.id} node={node} />
        ))}
      </Offset.Provider>
    </div>
  );
}

function FrameNode({node}: any) {
  const [css] = useStyletron();
  const offset = React.useContext(Offset);
  return (
    <div
      {...getDataIds(node)}
      className={css({
        position: 'absolute',
        top: node.absoluteBoundingBox.y - offset.y + 'px',
        left: node.absoluteBoundingBox.x - offset.x + 'px',
        width: node.absoluteBoundingBox.width + 'px',
        height: node.absoluteBoundingBox.height + 'px',
        backgroundColor: getBackgroundColor(node),
        overflow: node.clipsContent ? 'hidden' : null,
        boxShadow: getBoxShadow(node),
        border: getBorder(node),
      })}
    >
      <Offset.Provider
        value={{x: node.absoluteBoundingBox.x, y: node.absoluteBoundingBox.y}}
      >
        {node.children.map(node => (
          <Node key={node.id} node={node} />
        ))}
      </Offset.Provider>
    </div>
  );
}

// Figma embeds fonts in app so we need to map fonts to web fonts
function getFontFamily(font) {
  switch (font) {
    case 'Roboto Mono':
      return 'Roboto Mono, Consolas, Menlo, monospace';
    case 'SF Pro Text':
      return 'SF Pro Text, system-ui, sans-serif';
    case 'Uber Move Text':
      return 'Uber Move Text, system-ui, sans-serif';
    case 'Uber Move':
      return 'Uber Move, system-ui, sans-serif';
    default:
      return font;
  }
}

function getBackgroundColor(node) {
  if (
    node.fills &&
    node.fills[0] &&
    node.fills[0].visible !== false &&
    node.fills[0].color
  ) {
    const {r, g, b, a} = node.fills[0].color;
    return `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
  }

  return null;
}

function getBorder(node) {
  if (
    node.strokes &&
    node.strokes[0] &&
    node.strokes[0].visible !== false &&
    node.strokes[0].color
  ) {
    const {r, g, b, a} = node.strokes[0].color;
    return `solid ${node.strokeWeight}px rgba(${r * 255}, ${g * 255}, ${b *
      255}, ${a})`;
  }

  return null;
}

function getBorderRadii(node) {
  return node.type === 'ELLIPSE'
    ? {
        borderTopLeftRadius: '100%',
        borderTopRightRadius: '100%',
        borderBottomRightRadius: '100%',
        borderBottomLeftRadius: '100%',
      }
    : node.cornerRadius
    ? {
        borderTopLeftRadius: node.cornerRadius + 'px',
        borderTopRightRadius: node.cornerRadius + 'px',
        borderBottomRightRadius: node.cornerRadius + 'px',
        borderBottomLeftRadius: node.cornerRadius + 'px',
      }
    : {
        borderTopLeftRadius:
          node.rectangleCornerRadii && node.rectangleCornerRadii[0]
            ? node.rectangleCornerRadii[0] + 'px'
            : null,
        borderTopRightRadius:
          node.rectangleCornerRadii && node.rectangleCornerRadii[1]
            ? node.rectangleCornerRadii[1] + 'px'
            : null,
        borderBottomRightRadius:
          node.rectangleCornerRadii && node.rectangleCornerRadii[2]
            ? node.rectangleCornerRadii[2] + 'px'
            : null,
        borderBottomLeftRadius:
          node.rectangleCornerRadii && node.rectangleCornerRadii[3]
            ? node.rectangleCornerRadii[3] + 'px'
            : null,
      };
}

function getBoxShadow(node) {
  if (
    node.effects &&
    node.effects[0] &&
    node.effects[0].type === 'DROP_SHADOW' &&
    node.effects[0].visible !== false
  ) {
    const {r, g, b, a} = node.effects[0].color;
    const color = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
    return `${node.effects[0].offset.x}px ${node.effects[0].offset.y}px ${node.effects[0].radius}px ${color}`;
  }
  return null;
}

function getDataIds(node) {
  return {
    'data-node-id': node.id,
    'data-node-type': node.type,
    'data-node-name': node.name,
  };
}

export {Node, Offset, Styles, Vectors, Images};

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import Check from '../../icon/check.js';
import ChevronRight from '../../icon/chevron-right.js';
import Search from '../../icon/search.js';
import {ListItem, ListItemLabel, ARTWORK_SIZES} from '../index.js';

export const name = 'list-item';

export const component = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridColumnGap: '36px',
        gridRowGap: '16px',
        gridTemplateColumns: 'repeat(4, 325px)',
        padding: '24px',
      }}
    >
      <ListItem
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.SMALL}
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem
        endEnhancer={() => (
          <React.Fragment>
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
            <div style={{width: '18px'}} />
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
          </React.Fragment>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.SMALL}
        endEnhancer={() => (
          <React.Fragment>
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
            <div style={{width: '18px'}} />
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
          </React.Fragment>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        endEnhancer={() => (
          <React.Fragment>
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
            <div style={{width: '18px'}} />
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
          </React.Fragment>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <React.Fragment>
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
            <div style={{width: '18px'}} />
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
          </React.Fragment>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem endEnhancer={() => <ChevronRight />}>
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.SMALL}
        endEnhancer={() => <ChevronRight />}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} endEnhancer={() => <ChevronRight />}>
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => <ChevronRight />}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem endEnhancer={() => <ListItemLabel>Label</ListItemLabel>}>
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.SMALL}
        endEnhancer={() => <ListItemLabel>Label</ListItemLabel>}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        endEnhancer={() => <ListItemLabel>Label</ListItemLabel>}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => <ListItemLabel>Label</ListItemLabel>}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem>
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.SMALL}>
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search}>
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.LARGE}>
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.SMALL}
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem
        endEnhancer={() => (
          <React.Fragment>
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
            <div style={{width: '18px'}} />
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
          </React.Fragment>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.SMALL}
        endEnhancer={() => (
          <React.Fragment>
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
            <div style={{width: '18px'}} />
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
          </React.Fragment>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        endEnhancer={() => (
          <React.Fragment>
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
            <div style={{width: '18px'}} />
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
          </React.Fragment>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <React.Fragment>
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
            <div style={{width: '18px'}} />
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
          </React.Fragment>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem endEnhancer={() => <ChevronRight />}>
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.SMALL}
        endEnhancer={() => <ChevronRight />}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} endEnhancer={() => <ChevronRight />}>
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => <ChevronRight />}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem
        endEnhancer={() => (
          <ListItemLabel description="description">Label</ListItemLabel>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.SMALL}
        endEnhancer={() => (
          <ListItemLabel description="description">Label</ListItemLabel>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        endEnhancer={() => (
          <ListItemLabel description="description">Label</ListItemLabel>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <ListItemLabel description="description">Label</ListItemLabel>
        )}
      >
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem>
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.SMALL}>
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search}>
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.LARGE}>
        <ListItemLabel description="description">Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem endEnhancer={() => <ChevronRight />} sublist>
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} endEnhancer={() => <ChevronRight />} sublist>
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.MEDIUM}
        endEnhancer={() => <ChevronRight />}
        sublist
      >
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => <ChevronRight />}
        sublist
      >
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem
        endEnhancer={() => <ListItemLabel sublist>Label</ListItemLabel>}
        sublist
      >
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        endEnhancer={() => <ListItemLabel sublist>Label</ListItemLabel>}
        sublist
      >
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.MEDIUM}
        endEnhancer={() => <ListItemLabel sublist>Label</ListItemLabel>}
        sublist
      >
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => <ListItemLabel sublist>Label</ListItemLabel>}
        sublist
      >
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>

      {/* ---------------------------------------- */}

      <ListItem sublist>
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} sublist>
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.MEDIUM} sublist>
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.LARGE} sublist>
        <ListItemLabel sublist>Label</ListItemLabel>
      </ListItem>
    </div>
  );
};

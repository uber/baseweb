/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */
import React, {useState} from 'react';
import {useStyletron} from 'baseui';
import {StarRating} from 'baseui/rating';
import {Label2} from 'baseui/typography';
import Delete from 'baseui/icon/delete';

const Survey = () => {
  const [useCss, theme] = useStyletron();
  const [rating, setRating] = useState();
  const [isOpen, setIsOpen] = useState(true);
  return isOpen ? (
    <div
      className={useCss({
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        boxShadow: theme.lighting.shadow400,
        textAlign: 'center',
        padding: theme.sizing.scale800,
        backgroundColor: theme.colors.background,
        [`@media screen and (max-width: ${theme.breakpoints.medium}px`]: {
          display: 'none',
        },
      })}
    >
      <div
        className={useCss({
          marginBottom: theme.sizing.scale400,
        })}
      >
        <Label2>Overall, how satisfied are you with Base Web?</Label2>
      </div>
      <StarRating
        numItems={5}
        onChange={data => {
          setRating(data.value);
          window.open(`
            https://docs.google.com/forms/d/e/1FAIpQLSfQ6uxhW96LX31x5hbp2xIb-WPI0eIavfAb_s7lkhKnz-LIJQ/viewform?usp=pp_url&entry.1493106267=${data.value}
          `);
          setIsOpen(false);
        }}
        value={rating}
      />
      <div
        className={useCss({
          cursor: 'pointer',
          position: 'absolute',
          top: theme.sizing.scale400,
          right: theme.sizing.scale1600,
        })}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <Delete size="24px" />
      </div>
    </div>
  ) : null;
};

export default Survey;

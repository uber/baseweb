/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React, {useState} from 'react';
import {useStyletron} from 'baseui';
import {Label3, Paragraph3} from 'baseui/typography';

const Help = () => {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={css({
        position: 'fixed',
        bottom: '0px',
        right: theme.sizing.scale2400,
        boxShadow: theme.lighting.shadow400,
        padding: theme.sizing.scale400,
        backgroundColor: theme.colors.backgroundPrimary,
        display: 'none',
        [theme.mediaQuery.medium]: {
          display: 'block',
        },
      })}
    >
      <Label3
        overrides={{
          Block: {
            style: {
              cursor: 'pointer',
            },
          },
        }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Need help?
      </Label3>
      {isOpen ? (
        <Paragraph3>
          Join our{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://join.slack.com/t/baseui/shared_invite/enQtNDI0NTgwMjU0NDUyLWQ0M2RhZWNiMDAwNDA4MDFiOWQyNmViODNkMzFmZDczYzM4MDliNjU3MmZhYWE5YjZhZmJjZWY0MDIxZjdkYzE"
          >
            Slack channel
          </a>
          , or open a{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/uber/baseweb/issues/new/choose"
          >
            GitHub issue
          </a>
          !
        </Paragraph3>
      ) : null}
    </div>
  );
};

export default Help;

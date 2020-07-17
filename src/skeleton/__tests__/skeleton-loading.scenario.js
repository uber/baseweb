/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Skeleton} from '../index.js';
import {useStyletron} from '../../styles/index.js';
import imageFile from './static/adorable.png';
import {Avatar} from '../../avatar/index.js';

export default function Scenario() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2 * 1000);
  }, [setLoading]);
  const [css] = useStyletron();
  if (loading) {
    return (
      <div>
        <Skeleton
          rows={1}
          overrides={{
            Row: {
              style: {
                width: '300px',
                height: '150px',
              },
            },
          }}
        />
        <div className={css({display: 'flex', flexDirection: 'row'})}>
          <Skeleton
            rows={1}
            overrides={{
              Row: {
                style: {
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                },
              },
            }}
          />
          <Skeleton
            rows={2}
            overrides={{
              Row: {
                style: {
                  width: '220px',
                  height: '15px',
                  marginBottom: '0px',
                },
              },
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div id="content">
      <img
        className={css({
          width: '300px',
          height: '150px',
          marginBottom: '10px',
          marginTop: '10px',
          marginLeft: '10px',
          marginRight: '10px',
        })}
        alt=""
        src={imageFile}
      />
      <div className={css({display: 'flex', flexDirection: 'row'})}>
        <Avatar
          name={`username`}
          size={'50px'}
          overrides={{
            Root: {
              style: {
                marginTop: '10px',
                marginBottom: '10px',
                marginRight: '10px',
                marginLeft: '10px',
              },
            },
          }}
        />
        <div>
          <p
            className={css({
              marginLeft: '10px',
              marginTop: '10px',
              marginBottom: '0px',
              fontSize: '15px',
            })}
          >
            this is test paragraph one
          </p>
          <p
            className={css({
              marginLeft: '10px',
              marginTop: '10px',
              marginBottom: '0px',
              fontSize: '15px',
            })}
          >
            this is test paragraph two
          </p>
        </div>
      </div>
    </div>
  );
}

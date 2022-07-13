/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Skeleton } from '..';
import { useStyletron } from '../../styles';
import imageFile from './static/adorable.png';
import { Avatar } from '../../avatar';

export function Scenario() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2 * 1000);
  }, [setLoading]);
  const [css] = useStyletron();
  if (loading) {
    return (
      <div className={css({ width: '300px', margin: '10px' })}>
        <Skeleton
          height="150px"
          width="300px"
          overrides={{
            Root: {
              style: {
                marginBottom: '15px',
              },
            },
          }}
        />

        <div
          className={css({
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          })}
        >
          <Skeleton
            width="50px"
            height="50px"
            overrides={{
              Root: {
                style: {
                  borderRadius: '50%',
                },
              },
            }}
          />

          <Skeleton rows={2} width="220px" />
        </div>
      </div>
    );
  }

  return (
    <div id="content" className={css({ width: '300px', margin: '10px' })}>
      <img
        className={css({
          width: '300px',
          height: '150px',
        })}
        alt=""
        src={imageFile}
      />

      <div
        className={css({
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        })}
      >
        <Avatar name={`username`} size={'50px'} />
        <div>
          <p
            className={css({
              fontSize: '15px',
            })}
          >
            this is test paragraph one
          </p>
          <p
            className={css({
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

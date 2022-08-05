/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { KIND } from '../../button';
import * as React from 'react';
import { colors } from '../../tokens';
import { MessageCard, IMAGE_LAYOUT } from '..';
import deliveryHeroItalianSvg from './images/deliveryHeroItalian.svg';
import deliveryHeroItalianPng from './images/deliveryHeroItalian@3x.png';
import deliveryLargeStrawberriesSvg from './images/deliveryLargeStrawberries.svg';
import deliveryLargeStrawberriesPng from './images/deliveryLargeStrawberries@3x.png';
import earnerLargeRiderDriverSvg from './images/earnerLargeRiderDriver.svg';
import earnerLargeRiderDriverPng from './images/earnerLargeRiderDriver@3x.png';
import veniceJpg from './images/venice.jpg';

export function Scenario() {
  const containerStyle = {
    padding: '16px',
    width: '440px',
  };
  const rowStyle = {
    display: 'flex',
    marginBottom: '32px',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="left top"
            buttonLabel="CTA"
            image={{
              src: veniceJpg,
              backgroundPosition: 'left top',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="center top"
            buttonLabel="CTA"
            image={{
              src: veniceJpg,
              backgroundPosition: 'center top',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="right top"
            buttonLabel="CTA"
            image={{
              src: veniceJpg,
              backgroundPosition: 'right top',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="left center"
            buttonLabel="CTA"
            image={{
              src: veniceJpg,
              backgroundPosition: 'left center',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="center center"
            buttonLabel="CTA"
            image={{
              src: veniceJpg,
              backgroundPosition: 'center center',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="right center"
            buttonLabel="CTA"
            image={{
              src: veniceJpg,
              backgroundPosition: 'right center',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="left bottom"
            buttonLabel="CTA"
            image={{
              src: veniceJpg,
              backgroundPosition: 'left bottom',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="center bottom"
            buttonLabel="CTA"
            image={{
              src: veniceJpg,
              backgroundPosition: 'center bottom',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="right bottom"
            buttonLabel="CTA"
            image={{
              src: veniceJpg,
              backgroundPosition: 'right bottom',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="left top"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: 'left top',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="center top"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: 'center top',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="right top"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: 'right top',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="left center"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: 'left center',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="center center"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: 'center center',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="right center"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: 'right center',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="left bottom"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: 'left bottom',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="center bottom"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: 'center bottom',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="right bottom"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: 'right bottom',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="25% 75%"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: '25% 75%',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="10px 20px"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: '10px 20px',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="-30% 25px"
            buttonLabel="CTA"
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              backgroundPosition: '-30% 25px',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
      </div>
    </div>
  );
}

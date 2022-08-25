/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { colors } from '../../tokens';
import { MessageCard, IMAGE_LAYOUT } from '..';
import deliveryHeroItalianPng from './deliveryHeroItalian@3x.png';
import veniceJpg from './venice.jpg';

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
              ariaLabel: 'Cruising down a Venetian canal in a gondola',
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
              ariaLabel: 'Cruising down a Venetian canal in a gondola',
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
              ariaLabel: 'Cruising down a Venetian canal in a gondola',
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
              ariaLabel: 'Cruising down a Venetian canal in a gondola',
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
              ariaLabel: 'Cruising down a Venetian canal in a gondola',
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
              ariaLabel: 'Cruising down a Venetian canal in a gondola',
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
              ariaLabel: 'Cruising down a Venetian canal in a gondola',
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
              ariaLabel: 'Cruising down a Venetian canal in a gondola',
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
              ariaLabel: 'Cruising down a Venetian canal in a gondola',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
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
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
      </div>
    </div>
  );
}

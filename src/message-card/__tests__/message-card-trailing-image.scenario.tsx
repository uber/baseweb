/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { colors } from '../../tokens';
import { IMAGE_LAYOUT, BUTTON_KIND } from '../constants';
import { MessageCard } from '..';
import deliveryHeroItalianSvg from './deliveryHeroItalian.svg';
import deliveryHeroItalianPng from './deliveryHeroItalian@3x.png';
import deliveryLargeStrawberriesSvg from './deliveryLargeStrawberries.svg';
import deliveryLargeStrawberriesPng from './deliveryLargeStrawberries@3x.png';
import earnerLargeRiderDriverSvg from './earnerLargeRiderDriver.svg';
import earnerLargeRiderDriverPng from './earnerLargeRiderDriver@3x.png';
import veniceJpg from './venice.jpg';

export function Scenario() {
  const containerStyle = {
    padding: '16px',
    flexBasis: '440px',
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
            heading="Heading"
            paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
            buttonLabel="Save now"
            image={{
              src: deliveryHeroItalianSvg,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.red200}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
            buttonLabel="Save now"
            image={{
              src: deliveryLargeStrawberriesSvg,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'Illustration of strawberries',
            }}
            onClick={() => console.log('Saved')}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="Heading"
            paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
            image={{
              src: earnerLargeRiderDriverSvg,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'A car with a driver and a passenger both wearing masks',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.blue300}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="Heading"
            paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
            buttonLabel="Save now"
            buttonKind={BUTTON_KIND.tertiary}
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.green300}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
            buttonLabel="Save now"
            buttonKind={BUTTON_KIND.tertiary}
            image={{
              src: deliveryLargeStrawberriesPng,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'Illustration of strawberries',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.white}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="Heading"
            paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
            image={{
              src: earnerLargeRiderDriverPng,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'A car with a driver and a passenger both wearing masks',
            }}
            onClick={() => console.log('Saved')}
            backgroundColor={colors.purple300}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="Heading"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            buttonLabel="Make it happen"
            image={{
              src: deliveryHeroItalianSvg,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
            }}
            onClick={() => console.log('Made it happen')}
            backgroundColor={colors.magenta700}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
            buttonLabel="Go!"
            image={{
              src: deliveryLargeStrawberriesSvg,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'Illustration of strawberries',
            }}
            onClick={() => console.log('Gone')}
            backgroundColor={colors.teal500}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="Much longer heading"
            paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
            image={{
              src: earnerLargeRiderDriverSvg,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'A car with a driver and a passenger both wearing masks',
            }}
            onClick={() => console.log('Gone')}
            backgroundColor={colors.yellow700}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="Much longer heading"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            buttonLabel="Make it happen"
            buttonKind={BUTTON_KIND.tertiary}
            image={{
              src: deliveryHeroItalianPng,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'Illustration of an Italian meal with pizza and pasta on a picnic table',
            }}
            onClick={() => console.log('Made it happen')}
            backgroundColor={colors.orange600}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            buttonLabel="Go!"
            buttonKind={BUTTON_KIND.tertiary}
            image={{
              src: deliveryLargeStrawberriesPng,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'Illustration of strawberries',
            }}
            onClick={() => console.log('Gone')}
            backgroundColor={colors.red700}
          />
        </div>
        <div style={containerStyle}>
          <MessageCard
            heading="Much longer heading"
            paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
            image={{
              src: earnerLargeRiderDriverPng,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'A car with a driver and a passenger both wearing masks',
            }}
            onClick={() => console.log('Gone')}
            backgroundColor={colors.cobalt700}
          />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={containerStyle}>
          <MessageCard
            heading="Tall JPG image doesn't oversize"
            buttonLabel="CTA!"
            image={{
              src: veniceJpg,
              layout: IMAGE_LAYOUT.trailing,
              ariaLabel: 'Cruising down a Venetian canal in a gondola',
            }}
            onClick={() => console.log('CTA')}
            backgroundColor={colors.cobalt700}
          />
        </div>
      </div>
    </div>
  );
}

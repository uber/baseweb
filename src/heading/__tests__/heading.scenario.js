/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Heading, HeadingLevel} from '../index.js';
import {Paragraph1} from '../../typography/index.js';

export const name = 'heading';

export const component = () => (
  <HeadingLevel>
    <Heading>Base Web [L1]</Heading>
    <Paragraph1>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
      fermentum velit ante, ac fringilla nulla pulvinar in. Aenean ut nisi
      mattis, lobortis purus vel, aliquet ante. In vel viverra lectus. Vivamus a
      diam faucibus, rutrum quam a, varius felis. Sed pellentesque sodales
      libero commodo vestibulum. Phasellus convallis gravida tempor. Sed ut
      bibendum nisl.
    </Paragraph1>
    <HeadingLevel>
      <Heading>Introduction [L2]</Heading>
      <Paragraph1>
        Vivamus vehicula justo suscipit, vestibulum nibh eu, faucibus nisi.
        Aenean molestie sapien nibh, sed sagittis turpis iaculis id. Nam mollis
        pulvinar ex eget gravida. Pellentesque fringilla odio a consequat
        condimentum. Curabitur ut auctor mi. Nunc blandit, tellus quis fringilla
        sollicitudin, risus libero scelerisque lorem, ut sagittis risus ipsum in
        nisl.
      </Paragraph1>
      <HeadingLevel>
        <Heading>Quotes [L3]</Heading>
        <Paragraph1>
          Cras posuere placerat sem sit amet dignissim. Sed pellentesque
          sagittis sapien at maximus. Ut at gravida lectus. Suspendisse lectus
          libero, eleifend vestibulum imperdiet ut, rhoncus eu augue.
          Pellentesque in vulputate lacus, quis molestie lorem. Aenean sit amet
          blandit nisi. Nullam molestie mi vel quam vehicula, in cursus eros
          tempus. Sed placerat turpis vestibulum quam suscipit, eget volutpat
          massa aliquet.
        </Paragraph1>
        <HeadingLevel>
          <Heading>Subtitle [L4]</Heading>
          <Paragraph1>
            Proin et posuere lectus. Curabitur condimentum, mauris in viverra
            euismod, diam elit porttitor quam, ac dictum diam diam eu mauris.
            Maecenas viverra, turpis sed commodo hendrerit, quam ipsum finibus
            mauris, et scelerisque sapien tellus mollis leo. Praesent posuere,
            felis at sagittis hendrerit, est massa tincidunt risus, eget tempus
            dolor ligula et odio. Praesent luctus lacus quis tristique semper.
            Etiam semper lacus non auctor fringilla.
          </Paragraph1>
          <HeadingLevel>
            <Heading>Subtitle [L5]</Heading>
            <Paragraph1>
              Vivamus vehicula justo suscipit, vestibulum nibh eu, faucibus
              nisi. Aenean molestie sapien nibh, sed sagittis turpis iaculis id.
              Nam mollis pulvinar ex eget gravida. Pellentesque fringilla odio a
              consequat condimentum. Curabitur ut auctor mi. Nunc blandit,
              tellus quis fringilla sollicitudin, risus libero scelerisque
              lorem, ut sagittis risus ipsum in nisl.
            </Paragraph1>
            <HeadingLevel>
              <Heading>Subtitle [L6]</Heading>
              <Paragraph1>
                Proin et posuere lectus. Curabitur condimentum, mauris in
                viverra euismod, diam elit porttitor quam, ac dictum diam diam
                eu mauris. Maecenas viverra, turpis sed commodo hendrerit, quam
                ipsum finibus mauris, et scelerisque sapien tellus mollis leo.
                Praesent posuere, felis at sagittis hendrerit, est massa
                tincidunt risus, eget tempus dolor ligula et odio. Praesent
                luctus lacus quis tristique semper. Etiam semper lacus non
                auctor fringilla.
              </Paragraph1>
            </HeadingLevel>
          </HeadingLevel>
        </HeadingLevel>
      </HeadingLevel>
      <Heading>Motivation [L2]</Heading>
      <Paragraph1>
        Vivamus vehicula justo suscipit, vestibulum nibh eu, faucibus nisi.
        Aenean molestie sapien nibh, sed sagittis turpis iaculis id. Nam mollis
        pulvinar ex eget gravida. Pellentesque fringilla odio a consequat
        condimentum. Curabitur ut auctor mi. Nunc blandit, tellus quis fringilla
        sollicitudin, risus libero scelerisque lorem, ut sagittis risus ipsum in
        nisl.
      </Paragraph1>
    </HeadingLevel>
  </HeadingLevel>
);

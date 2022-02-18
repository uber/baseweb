// @flow
import * as React from 'react';
import {Heading, HeadingLevel} from 'baseui/heading';
import {ParagraphSmall} from 'baseui/typography';

export default () => (
  <HeadingLevel>
    <Heading styleLevel={4}>Base Web [L1 styled as L4]</Heading>
    <ParagraphSmall>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Vestibulum fermentum velit ante, ac fringilla nulla pulvinar
      in. Aenean ut nisi mattis, lobortis purus vel, aliquet ante.
      In vel viverra lectus. Vivamus a diam faucibus, rutrum quam a,
      varius felis. Sed pellentesque sodales libero commodo
      vestibulum. Phasellus convallis gravida tempor. Sed ut
      bibendum nisl.
    </ParagraphSmall>
    <HeadingLevel>
      <Heading styleLevel={5}>
        Introduction [L2 styled as L5]
      </Heading>
      <ParagraphSmall>
        Vivamus vehicula justo suscipit, vestibulum nibh eu,
        faucibus nisi. Aenean molestie sapien nibh, sed sagittis
        turpis iaculis id. Nam mollis pulvinar ex eget gravida.
        Pellentesque fringilla odio a consequat condimentum.
        Curabitur ut auctor mi. Nunc blandit, tellus quis fringilla
        sollicitudin, risus libero scelerisque lorem, ut sagittis
        risus ipsum in nisl.
      </ParagraphSmall>
      <HeadingLevel>
        <Heading styleLevel={6}>Quotes [L3 styled as L6]</Heading>
        <ParagraphSmall>
          Cras posuere placerat sem sit amet dignissim. Sed
          pellentesque sagittis sapien at maximus. Ut at gravida
          lectus. Suspendisse lectus libero, eleifend vestibulum
          imperdiet ut, rhoncus eu augue. Pellentesque in vulputate
          lacus, quis molestie lorem. Aenean sit amet blandit nisi.
          Nullam molestie mi vel quam vehicula, in cursus eros
          tempus. Sed placerat turpis vestibulum quam suscipit, eget
          volutpat massa aliquet.
        </ParagraphSmall>
      </HeadingLevel>
      <Heading styleLevel={5}>Motivation [L2 styled as L5]</Heading>
      <ParagraphSmall>
        Proin et posuere lectus. Curabitur condimentum, mauris in
        viverra euismod, diam elit porttitor quam, ac dictum diam
        diam eu mauris. Maecenas viverra, turpis sed commodo
        hendrerit, quam ipsum finibus mauris, et scelerisque sapien
        tellus mollis leo. Praesent posuere, felis at sagittis
        hendrerit, est massa tincidunt risus, eget tempus dolor
        ligula et odio. Praesent luctus lacus quis tristique semper.
        Etiam semper lacus non auctor fringilla.
      </ParagraphSmall>
    </HeadingLevel>
  </HeadingLevel>
);

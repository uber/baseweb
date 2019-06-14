import * as React from 'react';
import {AspectRatioBox, StyledBody} from 'baseui/aspect-ratio-box';
import {Block} from 'baseui/block';
import {Button, KIND} from 'baseui/button';

const CalendarBodyComponent = props => (
  <StyledBody $as={Button} kind={KIND.minimal} {...props} />
);

const props = {
  overrides: {
    Root: {
      style: {
        width: `${100 / 7}%`,
      },
    },
    Body: {
      component: CalendarBodyComponent,
    },
  },
};

export default () => (
  <Block display="flex" flexWrap>
    <AspectRatioBox {...props}>Feb 1</AspectRatioBox>
    <AspectRatioBox {...props}>2</AspectRatioBox>
    <AspectRatioBox {...props}>3</AspectRatioBox>
    <AspectRatioBox {...props}>4</AspectRatioBox>
    <AspectRatioBox {...props}>5</AspectRatioBox>
    <AspectRatioBox {...props}>6</AspectRatioBox>
    <AspectRatioBox {...props}>7</AspectRatioBox>
    <AspectRatioBox {...props}>8</AspectRatioBox>
    <AspectRatioBox {...props}>9</AspectRatioBox>
    <AspectRatioBox {...props}>10</AspectRatioBox>
    <AspectRatioBox {...props}>11</AspectRatioBox>
    <AspectRatioBox {...props}>12</AspectRatioBox>
    <AspectRatioBox {...props}>13</AspectRatioBox>
    <AspectRatioBox {...props}>14</AspectRatioBox>
    <AspectRatioBox {...props}>15</AspectRatioBox>
    <AspectRatioBox {...props}>16</AspectRatioBox>
    <AspectRatioBox {...props}>17</AspectRatioBox>
    <AspectRatioBox {...props}>18</AspectRatioBox>
    <AspectRatioBox {...props}>19</AspectRatioBox>
    <AspectRatioBox {...props}>20</AspectRatioBox>
    <AspectRatioBox {...props}>21</AspectRatioBox>
    <AspectRatioBox {...props}>22</AspectRatioBox>
    <AspectRatioBox {...props}>23</AspectRatioBox>
    <AspectRatioBox {...props}>24</AspectRatioBox>
    <AspectRatioBox {...props}>25</AspectRatioBox>
    <AspectRatioBox {...props}>26</AspectRatioBox>
    <AspectRatioBox {...props}>27</AspectRatioBox>
    <AspectRatioBox {...props}>28</AspectRatioBox>
  </Block>
);

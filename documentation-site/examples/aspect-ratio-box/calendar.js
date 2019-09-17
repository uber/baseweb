// @flow
import * as React from 'react';
import {
  AspectRatioBox,
  AspectRatioBoxBody,
} from 'baseui/aspect-ratio-box';
import {Button, KIND} from 'baseui/button';
import {useStyletron} from 'baseui';

const CalendarButton = props => (
  <Button
    kind={KIND.minimal}
    overrides={{
      BaseButton: {
        style: {
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
      },
    }}
    {...props}
  />
);

const DateBox = props => (
  <AspectRatioBox width={`${100 / 7}%`}>
    <AspectRatioBoxBody as={CalendarButton} {...props} />
  </AspectRatioBox>
);

export default () => {
  const [css] = useStyletron();
  return (
    <div className={css({display: 'flex', flexWrap: 'wrap'})}>
      <DateBox>Feb 1</DateBox>
      <DateBox>2</DateBox>
      <DateBox>3</DateBox>
      <DateBox>4</DateBox>
      <DateBox>5</DateBox>
      <DateBox>6</DateBox>
      <DateBox>7</DateBox>
      <DateBox>8</DateBox>
      <DateBox>9</DateBox>
      <DateBox>10</DateBox>
      <DateBox>11</DateBox>
      <DateBox>12</DateBox>
      <DateBox>13</DateBox>
      <DateBox>14</DateBox>
      <DateBox>15</DateBox>
      <DateBox>16</DateBox>
      <DateBox>17</DateBox>
      <DateBox>18</DateBox>
      <DateBox>19</DateBox>
      <DateBox>20</DateBox>
      <DateBox>21</DateBox>
      <DateBox>22</DateBox>
      <DateBox>23</DateBox>
      <DateBox>24</DateBox>
      <DateBox>25</DateBox>
      <DateBox>26</DateBox>
      <DateBox>27</DateBox>
      <DateBox>28</DateBox>
    </div>
  );
};

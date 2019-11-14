/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */
import React, {useState, useEffect} from 'react';
import CookiesConstructor from 'universal-cookie';

// $FlowFixMe
import {trackEvent} from '../helpers/ga';

import {useStyletron} from 'baseui';
import {StarRating} from 'baseui/rating';
import {Label2} from 'baseui/typography';
import Delete from 'baseui/icon/delete';

const Survey = () => {
  const [useCss, theme] = useStyletron();
  const [rating, setRating] = useState();
  const [isOpen, setIsOpen] = useState(false);

  // we want to show the survey only if the user already spent a few minutes on the site
  useEffect(() => {
    const {showSurvey, delay} = shouldShowSurvey();
    if (!showSurvey) return;
    setTimeout(() => {
      setIsOpen(showSurvey);
    }, delay);
  }, []);

  return isOpen ? (
    <div
      className={useCss({
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        boxShadow: theme.lighting.shadow400,
        color: theme.colors.foreground,
        textAlign: 'center',
        paddingTop: theme.sizing.scale800,
        paddingBottom: theme.sizing.scale800,
        backgroundColor: theme.colors.background,
        display: 'none',
        [theme.mediaQuery.medium]: {
          display: 'block',
        },
      })}
    >
      <div
        className={useCss({
          marginBottom: theme.sizing.scale400,
        })}
      >
        <Label2>Overall, how satisfied are you with Base Web?</Label2>
      </div>
      <StarRating
        numItems={5}
        onChange={data => {
          setRating(data.value);
          trackEvent('survey', 'csat', data.value);
          window.open(`
            https://docs.google.com/forms/d/e/1FAIpQLSfQ6uxhW96LX31x5hbp2xIb-WPI0eIavfAb_s7lkhKnz-LIJQ/viewform?usp=pp_url&entry.1493106267=${data.value}
          `);
          setIsOpen(false);
        }}
        value={rating}
      />
      <div
        role="button"
        tabIndex="0"
        onKeyPress={event => {
          if (event.key === 'Enter') {
            setIsOpen(false);
          }
        }}
        className={useCss({
          cursor: 'pointer',
          position: 'absolute',
          top: theme.sizing.scale400,
          right: theme.sizing.scale400,
        })}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <Delete size="24px" />
      </div>
    </div>
  ) : null;
};

// we want to show the survey once every two months
function shouldShowSurvey() {
  try {
    // forcing the display of the survey for testing purposes
    const {search} = window.location;
    if (search && search.includes('survey')) {
      return {showSurvey: true, delay: 0};
    }
  } catch (err) {
    // do nothing
  }

  const Cookies = new CookiesConstructor();

  const cookies = {
    FIRST_SEEN: 'survey-user-first-seen',
    LAST_SURVEYED: 'survey-last-surveyed',
  };
  const TWO_MONTHS = 60 * 24 * 60 * 60 * 1000;
  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
  const SURVEY_DELAY = 0.5 * 60 * 1000; // 30 seconds

  const firstSeen = Cookies.get(cookies.FIRST_SEEN);
  const lastSurveyed = Cookies.get(cookies.LAST_SURVEYED);
  const delay = 0;
  const now = new Date();

  // the person is a new visitor, bailing out
  if (!firstSeen) {
    Cookies.set(cookies.FIRST_SEEN, now.getTime(), {
      // by default, cookies are session cookies, so without an expiration they are removed
      // when the browser window is closed.
      expires: new Date(now.getFullYear() + 10, now.getMonth()),
      path: '/',
    });
    return {showSurvey: false, delay};
  }

  // the person only knows base web for less than a week
  if (now.getTime() - ONE_WEEK < firstSeen) {
    return {showSurvey: false, delay};
  }

  // the person was surveyed less than two months ago, bailing out
  if (now.getTime() - TWO_MONTHS < lastSurveyed) {
    return {showSurvey: false, delay};
  }

  Cookies.set(cookies.LAST_SURVEYED, now.getTime(), {
    expires: new Date(now.getFullYear() + 10, now.getMonth()),
    path: '/',
  });
  return {showSurvey: true, delay: SURVEY_DELAY};
}

export default Survey;

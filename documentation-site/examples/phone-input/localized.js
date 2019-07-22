// @flow
import React from 'react';
import {StatefulPhoneInput} from 'baseui/phone-input';

const iso2FlagEmoji = iso =>
  String.fromCodePoint(
    ...[...iso.toUpperCase()].map(
      char => char.charCodeAt(0) + 127397,
    ),
  );

export default () => (
  <StatefulPhoneInput mapIsoToLabel={iso => iso2FlagEmoji(iso)} />
);

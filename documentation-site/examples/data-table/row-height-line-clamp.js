// @flow

import React from 'react';

import {
  Unstable_StatefulDataTable,
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
  NUMERICAL_FORMATS,
} from 'baseui/data-table';

const loremIpsum = `"We went upstairs together, the colonel first with the lamp, the fat manager and I behind him. It was a labyrinth of an old house, with corridors, passages, narrow winding staircases, and little low doors, the thresholds of which were hollowed out by the generations who had crossed them. There were no carpets and no signs of any furniture above the ground floor, while the plaster was peeling off the walls, and the damp was breaking through in green, unhealthy blotches. I tried to put on as unconcerned an air as possible, but I had not forgotten the warnings of the lady, even though I disregarded them, and I kept a keen eye upon my two companions. Ferguson appeared to be a morose and silent man, but I could see from the little that he said that he was at least a fellow-countryman.`;

const columns = [
  StringColumn({title: 'Movie Title'}),
  StringColumn({
    title: 'Lorem Ipsum Description',
    maxWidth: 300,
    lineClamp: 3,
  }),
  CategoricalColumn({title: 'Genre'}),
  NumericalColumn({
    title: 'Production Budget (millions)',
    format: NUMERICAL_FORMATS.ACCOUNTING,
  }),
  NumericalColumn({
    title: 'Box Office (millions)',
    format: NUMERICAL_FORMATS.ACCOUNTING,
  }),
  NumericalColumn({title: 'ROI', precision: 2}),
  NumericalColumn({title: 'Rating IMDB', precision: 2}),
];

const rows = [
  ['Avatar', loremIpsum, 'Action', 237, 2784, 11.7, 8.0],
  ['The Blind Side', loremIpsum, 'Drama', 29, 309, 10.7, 7.6],
  ['The Dark Knight', loremIpsum, 'Action', 185, 1005, 5.4, 9.0],
  [
    'ET: The Extra-Terrestrial',
    loremIpsum,
    'Drama',
    11,
    793,
    75.5,
    7.9,
  ],
  ['Finding Nemo', loremIpsum, 'Adventure', 94, 940, 10.0, 8.1],
  ['Ghostbusters', loremIpsum, 'Comedy', 144, 229, 1.6, 7.8],
  [
    'The Hunger Games',
    loremIpsum,
    'Thriller/Suspense',
    78,
    649,
    8.3,
    7.2,
  ],
  ['Iron Man 3', loremIpsum, 'Action', 178, 1215, 6.8, 7.6],
  ['Jurassic Park', loremIpsum, 'Action', 53, 1030, 19.4, 8.0],
  ['King Kong', loremIpsum, 'Adventure', 207, 551, 2.7, 7.3],
  ['The Lion King', loremIpsum, 'Adventure', 115, 577, 5.0, 8.0],
  ['Monsters, Inc.', loremIpsum, 'Adventure', 115, 577, 5.0, 8.0],
  [
    'The Twilight Saga: New Moon',
    loremIpsum,
    'Drama',
    50,
    710,
    14.2,
    4.5,
  ],
  [
    'Oz the Great and Powerful',
    loremIpsum,
    'Adventure',
    160,
    493,
    3.1,
    6.6,
  ],
  [
    `Pirates of the Caribbean: Dead Man's Chest`,
    loremIpsum,
    'Adventure',
    225,
    1066,
    4.7,
    7.3,
  ],
  ['Quantum of Solace', loremIpsum, 'Action', 200, 586, 2.9, 6.7],
  [
    'Raiders of the Lost Ark',
    loremIpsum,
    'Adventure',
    18,
    390,
    21.7,
    8.7,
  ],
  [
    'Star Wars Ep. I: The Phantom Menace',
    loremIpsum,
    'Adventure',
    115,
    1027,
    8.9,
    6.5,
  ],
  [
    'Titanic',
    loremIpsum,
    'Thriller/Suspense',
    200,
    2187,
    10.9,
    7.6,
  ],
  ['Up', loremIpsum, 'Adventure', 175, 735, 4.2, 8.3],
  ['The Vow', loremIpsum, 'Drama', 30, 196, 6.5, 6.7],
  [
    'The War of the Worlds',
    loremIpsum,
    'Action',
    132,
    704,
    5.3,
    6.5,
  ],
  [
    'X-Men: The Last Stand',
    loremIpsum,
    'Action',
    210,
    459,
    2.2,
    6.8,
  ],
  [`You've Got Mail`, loremIpsum, 'Drama', 65, 251, 3.9, 6.3],
  ['Zookeeper', loremIpsum, 'Romantic Comedy', 80, 170, 2.1, 5.0],
].map(r => ({id: r[0], data: r}));

export default () => {
  return (
    <div style={{height: '600px'}}>
      <Unstable_StatefulDataTable
        columns={columns}
        rows={rows}
        rowHeight={78}
      />
    </div>
  );
};

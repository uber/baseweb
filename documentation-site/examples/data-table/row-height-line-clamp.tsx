// @flow

import React from 'react';

import {
  Unstable_StatefulDataTable,
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
  NUMERICAL_FORMATS,
} from 'baseui/data-table';

type RowDataT = {
  title: string;
  loremIpsum: string;
  genre: string;
  budget: number;
  boxOffice: number;
  roi: number;
  imdb: number;
};

const loremIpsum = `"We went upstairs together, the colonel first with the lamp, the fat manager and I behind him. It was a labyrinth of an old house, with corridors, passages, narrow winding staircases, and little low doors, the thresholds of which were hollowed out by the generations who had crossed them. There were no carpets and no signs of any furniture above the ground floor, while the plaster was peeling off the walls, and the damp was breaking through in green, unhealthy blotches. I tried to put on as unconcerned an air as possible, but I had not forgotten the warnings of the lady, even though I disregarded them, and I kept a keen eye upon my two companions. Ferguson appeared to be a morose and silent man, but I could see from the little that he said that he was at least a fellow-countryman.`;

const columns = [
  StringColumn({
    title: 'Movie Title',
    mapDataToValue: (data: RowDataT) => data.title,
  }),
  StringColumn({
    title: 'Lorem Ipsum Description',
    maxWidth: 300,
    lineClamp: 3,
    mapDataToValue: (data: RowDataT) => data.loremIpsum,
  }),
  CategoricalColumn({
    title: 'Genre',
    mapDataToValue: (data: RowDataT) => data.genre,
  }),
  NumericalColumn({
    title: 'Production Budget (millions)',
    format: NUMERICAL_FORMATS.ACCOUNTING,
    mapDataToValue: (data: RowDataT) => data.budget,
  }),
  NumericalColumn({
    title: 'Box Office (millions)',
    format: NUMERICAL_FORMATS.ACCOUNTING,
    mapDataToValue: (data: RowDataT) => data.boxOffice,
  }),

  NumericalColumn({
    title: 'ROI',
    precision: 2,
    mapDataToValue: (data: RowDataT) => data.roi,
  }),
  NumericalColumn({
    title: 'Rating IMDB',
    precision: 2,
    mapDataToValue: (data: RowDataT) => data.imdb,
  }),
];

const rows = [
  {
    title: 'Avatar',
    loremIpsum,
    genre: 'Action',
    budget: 237,
    boxOffice: 2784,
    roi: 11.7,
    imdb: 8.0,
  },
  {
    title: 'The Blind Side',
    loremIpsum,
    genre: 'Drama',
    budget: 29,
    boxOffice: 309,
    roi: 10.7,
    imdb: 7.6,
  },
  {
    title: 'The Dark Knight',
    loremIpsum,
    genre: 'Action',
    budget: 185,
    boxOffice: 1005,
    roi: 5.4,
    imdb: 9.0,
  },
  {
    title: 'ET: The Extra-Terrestrial',
    loremIpsum,
    genre: 'Drama',
    budget: 11,
    boxOffice: 793,
    roi: 75.5,
    imdb: 7.9,
  },
  {
    title: 'Finding Nemo',
    loremIpsum,
    genre: 'Adventure',
    budget: 94,
    boxOffice: 940,
    roi: 10.0,
    imdb: 8.1,
  },
  {
    title: 'Ghostbusters',
    loremIpsum,
    genre: 'Comedy',
    budget: 144,
    boxOffice: 229,
    roi: 1.6,
    imdb: 7.8,
  },
  {
    title: 'The Hunger Games',
    loremIpsum,
    genre: 'Thriller/Suspense',
    budget: 78,
    boxOffice: 649,
    roi: 8.3,
    imdb: 7.2,
  },
  {
    title: 'Iron Man 3',
    loremIpsum,
    genre: 'Action',
    budget: 178,
    boxOffice: 1215,
    roi: 6.8,
    imdb: 7.6,
  },
  {
    title: 'Jurassic Park',
    loremIpsum,
    genre: 'Action',
    budget: 53,
    boxOffice: 1030,
    roi: 19.4,
    imdb: 8.0,
  },
  {
    title: 'King Kong',
    loremIpsum,
    genre: 'Adventure',
    budget: 207,
    boxOffice: 551,
    roi: 2.7,
    imdb: 7.3,
  },
  {
    title: 'The Lion King',
    loremIpsum,
    genre: 'Adventure',
    budget: 115,
    boxOffice: 577,
    roi: 5.0,
    imdb: 8.0,
  },
  {
    title: 'Monsters, Inc.',
    loremIpsum,
    genre: 'Adventure',
    budget: 115,
    boxOffice: 577,
    roi: 5.0,
    imdb: 8.0,
  },
  {
    title: 'The Twilight Saga: New Moon',
    loremIpsum,
    genre: 'Drama',
    budget: 50,
    boxOffice: 710,
    roi: 14.2,
    imdb: 4.5,
  },
  {
    title: 'Oz the Great and Powerful',
    loremIpsum,
    genre: 'Adventure',
    budget: 160,
    boxOffice: 493,
    roi: 3.1,
    imdb: 6.6,
  },
  {
    title: `Pirates of the Caribbean: Dead Man's Chest`,
    loremIpsum,
    genre: 'Adventure',
    budget: 225,
    boxOffice: 1066,
    roi: 4.7,
    imdb: 7.3,
  },
  {
    title: 'Quantum of Solace',
    loremIpsum,
    genre: 'Action',
    budget: 200,
    boxOffice: 586,
    roi: 2.9,
    imdb: 6.7,
  },
  {
    title: 'Raiders of the Lost Ark',
    loremIpsum,
    genre: 'Adventure',
    budget: 18,
    boxOffice: 390,
    roi: 21.7,
    imdb: 8.7,
  },
  {
    title: 'Star Wars Ep. I: The Phantom Menace',
    loremIpsum,
    genre: 'Adventure',
    budget: 115,
    boxOffice: 1027,
    roi: 8.9,
    imdb: 6.5,
  },
  {
    title: 'Titanic',
    loremIpsum,
    genre: 'Thriller/Suspense',
    budget: 200,
    boxOffice: 2187,
    roi: 10.9,
    imdb: 7.6,
  },
  {
    title: 'Up',
    loremIpsum,
    genre: 'Adventure',
    budget: 175,
    boxOffice: 735,
    roi: 4.2,
    imdb: 8.3,
  },
  {
    title: 'The Vow',
    loremIpsum,
    genre: 'Drama',
    budget: 30,
    boxOffice: 196,
    roi: 6.5,
    imdb: 6.7,
  },
  {
    title: 'The War of the Worlds',
    loremIpsum,
    genre: 'Action',
    budget: 132,
    boxOffice: 704,
    roi: 5.3,
    imdb: 6.5,
  },
  {
    title: 'X-Men: The Last Stand',
    loremIpsum,
    genre: 'Action',
    budget: 210,
    boxOffice: 459,
    roi: 2.2,
    imdb: 6.8,
  },
  {
    title: `You've Got Mail`,
    loremIpsum,
    genre: 'Drama',
    budget: 65,
    boxOffice: 251,
    roi: 3.9,
    imdb: 6.3,
  },
  {
    title: 'Zookeeper',
    loremIpsum,
    genre: 'Romantic Comedy',
    budget: 80,
    boxOffice: 170,
    roi: 2.1,
    imdb: 5.0,
  },
].map(r => ({id: r.title, data: r}));

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

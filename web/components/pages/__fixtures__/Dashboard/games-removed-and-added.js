// @flow

import { createFixture } from 'react-cosmos';
import { getSampleUser, doAfter } from '../../../../utils/test-helpers';
import { getBlankGame } from 'shared/reducers/game';
import Dashboard from '../../Dashboard';

import type { ElementRef } from 'react';

const user = getSampleUser();
const game1 = getBlankGame({ id: 'dce6b11e', user });
const game2 = getBlankGame({ id: 'dce6b110', user });
const game3 = getBlankGame({ id: 'dce6b11b', user });

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true,
    games: {
      [game1.id]: game1,
      [game2.id]: game2
    }
  },

  async init({ compRef }: { compRef: ElementRef<Dashboard> }) {
    const { dispatch } = compRef.context.store;

    dispatch({
      type: 'REMOVE_GAME',
      payload: { gameId: game1.id }
    });

    await doAfter(100, () => {
      dispatch({
        type: 'ADD_GAME',
        payload: { game: game3 }
      });
    });

    await doAfter(100, () => {
      dispatch({
        type: 'REMOVE_GAME',
        payload: { gameId: game2.id }
      });
    });
  }
});

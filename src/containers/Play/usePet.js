import { useReducer, useEffect } from 'react';
import produce from "immer"

import { LifeCycle, Action } from './constants';
import useSleep from './useSleep';
import useDigest from './useDigest';

export const config = {
  maxStress: 100,
  turnAges : {
    teen: 10,
    adult: 20,
    eldery: 30,
    dead: 40,
  }
}

const initialState = {
  stage: LifeCycle.EGG,
  stress: 0,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Action.HATCH:
        draft.stage = LifeCycle.BABY;
        break;
      case Action.UPSTAGE:
        draft.stage = state.stage === LifeCycle.BABY ? LifeCycle.TEEN :
                    state.stage === LifeCycle.TEEN ? LifeCycle.ADULT :
                    state.stage === LifeCycle.ADULT ? LifeCycle.ELDERLY : LifeCycle.DEAD;
        break;
      case Action.DEAD:
        draft.stage = LifeCycle.DEAD;
        break;
      case Action.GOTSTRESS:
        draft.stress = state.stress + 1;
        break;
      case Action.RELIEVESTRESS:
        if (draft.stress > 0) {
          draft.stress = state.stress - 1;
        }
        break;
      default:
        break;
    }
  });

export default function usePet(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: stateSleep, actions: actionsSleep } = useSleep();
  const { state: stateDigest, actions: actionsDigest } = useDigest();

  const { onBed, dream, dreamTime, age, activeness, discomfort } = stateSleep;
  const { energy, dirty, poop } = stateDigest;
  
  const { bed } = actionsSleep;
  const { feed, cleanPoop } = actionsDigest;

  // Aging
  useEffect(() => {
    if (state.stage === LifeCycle.EGG) return;
    if (state.stage === LifeCycle.DEAD) return;

    if (state.stress > config.maxStress) {
      dispatch({type: Action.DEAD});
    }

    if ((state.stage === LifeCycle.BABY && age > config.turnAges.teen) ||
        (state.stage === LifeCycle.TEEN && age > config.turnAges.adult) ||
        (state.stage === LifeCycle.ADULT && age > config.turnAges.eldery) ||
        (state.stage === LifeCycle.ELDERLY && age > config.turnAges.dead)) {
      dispatch({type: Action.UPSTAGE});
    }
  }, [state, energy, poop, discomfort, age]);

  // Got stress
  useEffect(() => {
    if (state.stage === LifeCycle.EGG) return;
    if (state.stage === LifeCycle.DEAD) return;

    if (energy < 0 || poop || discomfort) {
      dispatch({type: Action.GOTSTRESS});
    }
  }, [state.stage, energy, poop, discomfort]);

  // Stop hungry when sleep.
  useEffect(() => {
    if (!stateDigest.isRun && !dream) {
      actionsDigest.start();
    }
    if (stateDigest.isRun && dream) {
      actionsDigest.stop();
    }
  }, [dream, stateDigest.isRun, actionsDigest]);

  // Dead
  useEffect(() => {
    if (state.stage === LifeCycle.DEAD) {
      if (stateSleep.isRun) {
        actionsSleep.stop();
      }
      if (stateDigest.isRun) {
        actionsDigest.stop();
      }
    }
  }, [state.stage, stateDigest.isRun, stateSleep.isRun, actionsDigest, actionsSleep]);

  const hatch = () => {
    dispatch({type: Action.HATCH});
    actionsSleep.start();
    actionsDigest.start();
  };

  const play = () => {
    dispatch({type: Action.RELIEVESTRESS});
  }

  const actions = {
    hatch, feed, cleanPoop, bed, play
  };

  return { state: { ...state, energy, dirty, poop, onBed, dream, dreamTime, age, activeness, discomfort }, actions };
}
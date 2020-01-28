import React from 'react';

import usePet from './usePet';
import { LifeCycle } from './constants';

export default function Play() {
  const { state, actions } = usePet(null);

  return (
    <div>
      <p>lift cycle stage: {state.stage}</p>
    
      {state.stage === LifeCycle.EGG &&
        <button onClick={() => actions.hatch()}>hatch</button>
      }
      {state.stage !== LifeCycle.EGG && (
        <div>
          <p>age: {state.age}</p>
          <p>stress: {state.stress}</p>

          {state.onBed && <p>onBed</p>}
          {state.dream && <p>dream</p>}
          {state.dreamTime>0 && <p>dreamTime: {state.dreamTime}</p>}
          {state.activeness>0 && <p>activeness: {state.activeness}</p>}
          {state.discomfort>0 && <p>discomfort: {state.discomfort}</p>}

          <p>energy: {state.energy}</p>
          {state.poop && <p>poop</p>}

          {state.energy < 0 &&
            <button onClick={() => actions.feed()}>feed</button>
          }
          {state.poop &&
            <button onClick={() => actions.cleanPoop()}>cleanPoop</button>
          }
          {state.activeness < 10 && !state.onBed &&
            <button onClick={() => actions.bed()}>bed</button>
          }
          {state.stress > 0 && !state.onBed && !state.dream &&
            <button onClick={() => actions.play()}>play</button>
          }
        </div>)
      }
    </div>
  )
}

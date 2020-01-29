import React from 'react';
import { Button } from '@material-ui/core';
import { LabeledGauge } from 'components/Gauge';

import usePet from './usePet';
import { time as timeDigest} from './useDigest';
import { time as timeSleep} from './useSleep';
import { config as configPet} from './usePet';
import { LifeCycle } from './constants';

export default function Play() {
  const { state, actions } = usePet(null);

  return (
    <div>
      <p>Tamagotchi is {state.stage}</p>
    
      {state.stage === LifeCycle.EGG ?
        <Button variant="contained" onClick={() => actions.hatch()}>hatch</Button>
      :
      (<div>
          <LabeledGauge label='age' reverse value={state.age} max={30}/>
          <LabeledGauge label='stress' reverse showPercent value={state.stress} max={configPet.maxStress}/>

          {state.dream ?
            <LabeledGauge label='dreamTime' showPercent value={state.dreamTime} max={timeSleep.dream}/>
            :
            <LabeledGauge label='activeness' showPercent value={state.activeness} max={timeSleep.awaken}/>
          }
          <LabeledGauge label='discomfort' showPercent reverse value={state.discomfort} max={10}/>
          <LabeledGauge label='energy' showPercent value={state.energy} max={timeDigest.energy}/>

          {
            <Button variant="contained" color="primary"
              onClick={() => actions.feed()}
              disabled={state.energy > 0}
            >
              feed
            </Button>
          }
          {
            <Button variant="contained" color="secondary"
              onClick={() => actions.cleanPoop()}
              disabled={!state.poop}
            >
              cleanPoop
            </Button>
          }
          {
            <Button variant="outlined"
              onClick={() => actions.bed()}
              disabled={!(state.activeness < 10 && !state.onBed)}
            >
              bed
            </Button>
          }
          {
            <Button variant="contained" color="primary"
              onClick={() => actions.play()}
              disabled={!(state.stress > 0 && !state.onBed && !state.dream)}
            >
              play
            </Button >
          }
        </div>)
      }
    </div>
  )
}

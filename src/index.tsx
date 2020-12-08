import React from 'react';
import ReactDOM from 'react-dom';
import {useSpring, animated} from 'react-spring';
import { SVG } from './SVG';
import useSound from 'use-sound';
import './demo.css';
const yesMP3 = require('./assets/yes.mp3');
const noMP3 = require('./assets/no.mp3');

function App() {
  const [status, setStatus/*, state, toggle*/] = React.useState('');
  const finished = () => {
    setTimeout(function () { alert('Finished'); }, 100);
  }

  const win = () => {
    playYes();
    setStatus('win');
  }

  const loose = () => {
    playNo();
    setStatus('loose');
  }

  const counter = useSpring({ number: 1000000000, from: { number: 0 } });
  const formatNumber = (num: any) => { return parseInt(num, 10); }

  const { W } = useSpring({ from: { W: 0 }, W: status == 'win' ? 1 : 0, config: { duration: 1000 } });
  const winningStyle = () => {
    if (status == 'win') return {
      transform: W
      .interpolate({
        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
        output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
      })
      .interpolate(W => `scale(${W})`)
    };
    return {};
  }

  const { L } = useSpring({ from: { L: 0 }, L: status == 'loose' ? 1 : 0, config: { duration: 1000 } });
  const losingStyle = () => {
    if (status == 'loose') return {
      transform: L
      .interpolate({
        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
        output: [0, 40, 0, 40, 0, 40, 15, 0]
      })
      .interpolate(L => `translate3d(${L}px, 0px, 0px)`)
    };
    return {};
  }

  const [playYes] = useSound(yesMP3);
  const [playNo] = useSound(noMP3);

  return (
    <div className="App">{/*1280 X 1024*/}
      <div className="container">
        <animated.div style={losingStyle()}>
          <div className="item" style={{ backgroundColor: status == 'loose' ? '#CF1322' : '' }} onClick={loose}>
            <SVG name="assets/laptop.svg" style={{ width: '411px', height: '291px', margin: '47px 0 0 -14px' }} />
          </div>
        </animated.div>
        <animated.div style={winningStyle()}>
          <div className="item" style={{ backgroundColor: status == 'win' ? '#89CE8C' : '' }} onClick={win}>
            <SVG name="assets/brain_complete.svg" style={{ width: '415px', height: '384px', margin: '25px 0 0 -16px' }} />
          </div>
        </animated.div>
      </div>
      <div id="outcome" style={{ height: '10%' }}>
        {/*<animated.span>{(counter.number)}</animated.span>*/}
        {status == 'win' && ( 'Thats Correct!')}
        {status == 'loose' && ( 'Try Again' )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
import React from 'react';
import ReactDOM from 'react-dom';
import { range } from 'd3';
import { Face } from './Face'

console.log(ReactDOM);

const width = 160;
const height = 160;

const array = range(6 * 3);

const App = () => array.map(() => (
  <Face 
  	width={width}  
    height={height}
    centerX={width / 2}
    centerY={height / 2}
    strokeWidth={6 + Math.random() * 3}
		eyeOffsetX={20 + Math.random() * 9}
		eyeOffsetY={20 + Math.random() * 15}
		eyeRadius={5 + Math.random() * 10}
		mouthWidth={7  + Math.random() * 9}
		mouthRadius={30 + Math.random() * 10}
  />
));

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
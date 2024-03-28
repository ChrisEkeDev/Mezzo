import React, { useState, useEffect, useRef } from 'react';
import { useMediaContext } from '../../Context/MediaContext';
import './styles.scss';

const MediaVisualizer = ({full}) => {
  const [ analyserNode, setAnalyserNode ] = useState(null);
  const [ dataArray, setDataArray ] = useState(null);
  const { mediaData, mediaContext } = useMediaContext();
  const { sourceRef } = mediaData;
  const LIGHT_COLOR = `#ffdde6`;
  const MAIN_COLOR = '#f34e77'
  const BACKGROUND_COLOR = '#ffffff';

  useEffect(() => {
    if (!mediaContext) return;
    const analyser = mediaContext.createAnalyser();
    analyser.fftSize = 256;
    setAnalyserNode(analyser);
    sourceRef.current.connect(analyser);
    analyser.connect(mediaContext.destination);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    setDataArray(dataArray);
    return () => {
        sourceRef.current.disconnect();
        analyser.disconnect();
    };
  }, [mediaContext, sourceRef]);

  useEffect(() => {
    if (!mediaContext || !analyserNode || !dataArray) return;
    const canvas = document.getElementById('audioCanvas');
    if (!canvas) return;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return;

    const draw = () => {
      requestAnimationFrame(draw);
      analyserNode.getByteFrequencyData(dataArray);
      canvasContext.fillStyle = 'red' || BACKGROUND_COLOR;
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      // const outerBarWidth = (canvas.width / (dataArray.length * 6)) * 3;
      // let x = 0;
      // for (let i = 0; i < dataArray.length; i++) {
      //   const barHeight = dataArray[i];
      //   const centerY = canvas.height / 2;
      //   const upperY = centerY - barHeight / 2;
      //   const lowerY = centerY + barHeight / 2;
      //   canvasContext.fillStyle = LIGHT_COLOR;
      //   canvasContext.fillRect(x, upperY, outerBarWidth, barHeight);
      //   canvasContext.fillRect(x, lowerY, outerBarWidth, -barHeight);
      //   x += outerBarWidth - 1;
      // }


      // const innerBarWidth = (canvas.width / (dataArray.length * 10)) * 3;
      // let y = 0;
      // for (let i = 0; i < dataArray.length; i++) {
      //   const barHeight = dataArray[i] / 2;
      //   const centerY = canvas.height / 2;
      //   const upperY = centerY - barHeight / 2;
      //   const lowerY = centerY + barHeight / 2;
      //   canvasContext.fillStyle = MAIN_COLOR;
      //   canvasContext.fillRect(y, upperY, innerBarWidth, barHeight);
      //   canvasContext.fillRect(y, lowerY, innerBarWidth, -barHeight);
      //   y += innerBarWidth - 1;
      // }
    };

    draw();
    return () => cancelAnimationFrame(draw);
}, [mediaContext, analyserNode, dataArray]);

  return (
      <canvas
        id="audioCanvas"
        style={{height: '100%', width: '100%'}}
      >
      </canvas>
  );
};

export default MediaVisualizer;

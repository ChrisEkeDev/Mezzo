import React, { useState, useEffect, useRef } from 'react';
import { useMediaContext } from '../../context/MediaContext';
import './styles.scss';

const MediaVisualizer = () => {
  const [ analyserNode, setAnalyserNode ] = useState(null);
  const [ dataArray, setDataArray ] = useState(null);
  const { sourceRef, mediaContext } = useMediaContext();
  const MAIN_COLOR = `#f34e77`;
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
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    const draw = () => {
      requestAnimationFrame(draw);
      analyserNode.getByteFrequencyData(dataArray);
      canvasCtx.fillStyle = BACKGROUND_COLOR;
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / (dataArray.length * 2)) * 5;
      let x = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i] / 2;
        canvasCtx.fillStyle = MAIN_COLOR;
        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
        x += barWidth - 1;
      }
    };




    draw();
    return () => cancelAnimationFrame(draw);
}, [mediaContext, analyserNode, dataArray]);

  return (
      <canvas
        id="audioCanvas"
        style={{width: '300px', height: '100%'}}>
      </canvas>
  );
};

export default MediaVisualizer;

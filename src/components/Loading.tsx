import { useState, useEffect } from 'react';

function Loading() {
  const [dots, setDots] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const loadingSteps = [
    'Connecting to S3 bucket...',
    'Authenticating credentials...',
    'Scanning directory structure...',
    'Fetching file metadata...',
    'Processing snapshot list...',
    'Finalizing data transfer...',
    'Ready!'
  ];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    const stepsInterval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        if (nextStep >= loadingSteps.length - 1) {
          setCompleted(true);
          return loadingSteps.length - 1;
        }
        return nextStep;
      });
    }, 900);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(stepsInterval);
    };
  }, []);

  const totalBlocks = 6;
  const progressBlocks = completed
    ? totalBlocks
    : Math.floor((currentStep / (loadingSteps.length - 2)) * totalBlocks);
  const emptyBlocks = totalBlocks - progressBlocks;

  return (
    <div className="loading">
      <div>root@forma:~$ fetch-snapshots --verbose</div>
      <div style={{ marginTop: '10px', color: completed ? '#00ff00' : '#888' }}>
        [INFO] {loadingSteps[currentStep]}{completed ? '' : dots}
      </div>
      <div style={{ marginTop: '20px', fontSize: '2em', color: '#00ff00' }}>
        {'▓'.repeat(progressBlocks)}{'░'.repeat(emptyBlocks)}
      </div>
      <div style={{ fontSize: '0.8em', marginTop: '15px', color: completed ? '#00ff00' : '#888' }}>
        {completed 
          ? 'Operation completed successfully | Loading file list...'
          : 'Press Ctrl+C to cancel | Network timeout: 30s'
        }
      </div>
    </div>
  );
}

export default Loading;

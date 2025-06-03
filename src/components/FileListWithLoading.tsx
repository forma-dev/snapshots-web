import { Suspense, useState, useEffect } from 'react';
import FileList from './FileList';
import Loading from './Loading';

function CompletedLoading() {
  return (
    <div className="loading">
      <div>root@forma:~$ fetch-snapshots --verbose</div>
      <div style={{ marginTop: '10px', color: '#00ff00' }}>
        [INFO] Ready!
      </div>
      <div style={{ marginTop: '20px', fontSize: '2em', color: '#00ff00' }}>
        ██████
      </div>
      <div style={{ fontSize: '0.8em', marginTop: '15px', color: '#00ff00' }}>
        Operation completed successfully | Loading file list...
      </div>
    </div>
  );
}

function FileListWithLoading() {
  const [showContent, setShowContent] = useState(false);
  const MINIMUM_LOADING_TIME = 6500;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, MINIMUM_LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  if (showContent) {
    return (
      <Suspense fallback={<CompletedLoading />}>
        <FileList />
      </Suspense>
    );
  }

  return <Loading />;
}

export default FileListWithLoading;

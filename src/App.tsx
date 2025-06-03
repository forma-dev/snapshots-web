import { useState } from 'react';
import { resetFilesCache } from './services/s3';
import FileListWithLoading from './components/FileListWithLoading';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    resetFilesCache();
    setRefreshKey((prev) => prev + 1);
  };

  const titlebarLinks = [
    {
      label: 'GitHub',
      title: 'View source on GitHub',
      href: 'https://github.com/forma-dev/snapshots-web',
    },
    {
      label: 'Docs',
      title: 'View documentation',
      href: 'https://docs.forma.art',
    },
    {
      label: 'Discord',
      title: 'Join our Discord',
      href: 'https://discord.gg/cfHDU8k7FQ',
    },
  ];

  return (
    <div className="terminal-window">
      <div className="terminal-titlebar">
        <div className="terminal-controls">
          <div className="close-btn"></div>
          <div className="minimize-btn"></div>
          <div className="maximize-btn"></div>
        </div>
        <span>forma-snapshots-terminal v1.0.0</span>
        <div className="titlebar-links">
          {titlebarLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="titlebar-link"
              title={link.title}
            >
              [{link.label}]
            </a>
          ))}
        </div>
      </div>
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="prompt">root@forma:~$</span> ls -la mainnet-snapshots/<span className="cursor">█</span>
          </h1>
          <p className="subtitle">{'// Forma Mainnet Snapshot Repository'}</p>
        </header>
        <div className="path-container">
          <div className="path-header">
            Current Directory:
          </div>
          <div className="path-content">
            <span className="path-text">s3://forma-public-dev/mainnet-snapshots/</span>
            <button
              onClick={handleRefresh}
              className="refresh-btn"
              title="Refresh file list"
            >
              [REFRESH]
            </button>
          </div>
        </div>
        <FileListWithLoading key={refreshKey} />
      </div>
    </div>
  );
}

export default App;

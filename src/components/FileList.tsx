import { use } from 'react';
import { getFiles } from '../services/s3';
import { formatFileSize, formatDate } from '../utils/format';

function FileList() {
  const files = use(getFiles());

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (files.length === 0) {
    return (
      <div className="empty-state">
        No snapshot files found in current directory.
      </div>
    );
  }

  return (
    <div className="file-list-container">
      <div className="file-list-header">
        <span>FILENAME</span>
        <span>SIZE</span>
        <span>LAST MODIFIED</span>
      </div>

      <ul className="file-list">
        {files.map((file) => (
          <li key={file.key} className="file-item">
            <a
              href={file.downloadUrl}
              className="file-name"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {file.name}
            </a>
            <span className="file-size">{formatFileSize(file.size)}</span>
            <span className="file-date">{formatDate(file.lastModified)}</span>
          </li>
        ))}
      </ul>

      <div className="stats">
        <div className="stats-line">TOTAL FILES: {files.length}</div>
        <div className="stats-line">TOTAL SIZE: {formatFileSize(totalSize)}</div>
        <div className="stats-line">LAST UPDATED: {files.length > 0 ? formatDate(files[0].lastModified) : 'N/A'}</div>
        <div className="stats-line">STATUS: READY</div>
      </div>
    </div>
  );
}

export default FileList;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProgressBar = ({ progress, color }) => {
    const progressBarStyle = {
        width: `${progress}%`,

        backgroundColor: color,
    };

    return (
        <div>
            <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ height: '50px', width: '320px' }} >
                <div className="progress-bar progress-bar-striped progress-bar-animated fs-5" style={progressBarStyle}>{progress}</div>
            </div>
        </div>
    );
}

export default ProgressBar;

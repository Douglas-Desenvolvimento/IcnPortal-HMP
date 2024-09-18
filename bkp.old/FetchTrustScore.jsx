import React, { useState } from 'react';

const FetchTrustScore = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [siteId, setSiteId] = useState('');
    const [username, setUsername] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("i-token", "ZmxvEQwKcY9DGoKYmMGU");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            phoneNumber,
            siteid: siteId,
            username
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,

            mode: 'no-cors'
        };

        try {
            const response = await fetch("https://213.163.247.230:8000/prove/cases/tscore/", requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setResult(result);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Site ID:</label>
                    <input
                        type="text"
                        value={siteId}
                        onChange={(e) => setSiteId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Fetch Trust Score</button>
            </form>
            {result && <div>Result: {JSON.stringify(result)}</div>}
            {error && <div>Error: {error.message}</div>}
        </div>
    );
};

export default FetchTrustScore;

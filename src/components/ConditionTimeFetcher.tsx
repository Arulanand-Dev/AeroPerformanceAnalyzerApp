import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTimeByCondition } from '../services/api';

interface TimeResult {
    time: number;
}

const ConditionTimeFetcher: React.FC = () => {
    const [channel, setChannel] = useState<number>(1);
    const [condition, setCondition] = useState<string>('');
    const [value, setValue] = useState<number>(1);
    const [fetch, setFetch] = useState<boolean>(false);

    const { data, error, isLoading } = useQuery<TimeResult | undefined>(
        {
            queryKey: ['getTimeByCondition', channel, condition, value],
            queryFn: () => {
                setFetch(false);
                return getTimeByCondition(channel, condition, value)
            },
            enabled: fetch
        }
    );

    return (
        <div className="p-4 border border-gray-300 rounded">
            <h2 className="text-lg font-semibold">Fetch Time by Condition</h2>
            <div className="mb-4">
                <label className="block mb-1">Channel:</label>
                <input
                    type="number"
                    value={channel}
                    onChange={(e) => setChannel(Number(e.target.value))}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Condition:</label>
                <input
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Value:</label>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>
            <button
                onClick={() => {
                    setFetch(true);
                }}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Fetch Time
            </button>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            {data && (
                <div className="mt-4">
                    <h3 className="font-semibold">Result:</h3>
                    <p>Time: {data.time}</p>
                </div>
            )}
        </div>
    );
};

export default ConditionTimeFetcher;

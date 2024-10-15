import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTimesForDefaultCondition } from '../services/api';

interface DefaultConditionResult {
  firstConditionTime: number;
  secondConditionTime: number;
  bothConditionTime: number;
}

const DefaultConditionFetcher: React.FC = () => {
  const { data: results, error, isLoading } = useQuery<DefaultConditionResult | undefined>({
    queryKey: ["getTimesForDefaultCondition"],
    queryFn: getTimesForDefaultCondition,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="border p-4 rounded shadow-lg max-w-md mx-auto mt-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Default Condition Times</h2>
      {error && <div className="text-red-500 mb-4 text-center">Failed to fetch default times.</div>}
      {results ? (
        <ul className="list-disc pl-5">
          <li className="mb-2">First Condition Time: <span className="font-semibold">{results.firstConditionTime}</span> seconds</li>
          <li className="mb-2">Second Condition Time: <span className="font-semibold">{results.secondConditionTime}</span> seconds</li>
          <li className="mb-2">Both Condition Time: <span className="font-semibold">{results.bothConditionTime}</span> seconds</li>
        </ul>
      ) : (
        <div className="text-center">No data available.</div>
      )}
    </div>
  );
};

export default DefaultConditionFetcher;

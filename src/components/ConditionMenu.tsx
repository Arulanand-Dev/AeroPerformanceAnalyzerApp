import React from 'react';
import { Link } from 'react-router-dom';

const ConditionMenu: React.FC = () => {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-lg mb-2">Condition API</h2>
      <ul>
        <li>
          <Link to="/condition-time" className="text-blue-500 hover:underline">Get Time By Condition</Link>
        </li>
        <li>
          <Link to="/default-conditions" className="text-blue-500 hover:underline">Get Times For Default Conditions</Link>
        </li>
      </ul>
    </div>
  );
};

export default ConditionMenu;

import React from 'react';

const QueryCard = ({ query }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md mb-4">
      <h3 className="text-xl font-bold">Query from: {query.name}</h3>
      <p className="mt-2"><strong>Email:</strong> {query.email}</p>
      <p className="mt-2"><strong>People:</strong> {query.people}</p>
      <p className="mt-2"><strong>Budget:</strong> {query.budget}</p>
      <p className="mt-2"><strong>Days:</strong> {query.days}</p>
    </div>
  );
};

export default QueryCard;
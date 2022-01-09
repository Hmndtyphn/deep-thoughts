// import react
import React from 'react';

// imort query
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

// import thought list
import ThoughtList from '../components/ThoughtList';


// homepage jsx
const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
  <div className="flex-row justify-space-between">
    <div className="col-12 mb-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
      )}
    </div>
  </div>
</main>
  );
};


// export home
export default Home;

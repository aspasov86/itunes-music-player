import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('/search/?term="nirvana"').then(console.log);
  }, []);

  return (
    <div>
      test
    </div>
  );
}

export default App;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Link, Route, Routes} from 'react-router-dom';

import Breakouts from './page1/Breakouts.tsx';

export function App() {
  return (
    <div>
      <div role="navigation">
        <Link to="/">Page1</Link> | <Link to="/page-2">Page 2</Link>
      </div>
      <Routes>
        <Route path="/" element={<Breakouts />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

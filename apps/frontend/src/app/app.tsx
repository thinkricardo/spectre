import { useEffect, useRef } from 'react';

import Canvas from './components/canvas';
import { store } from './store';

export function App() {
  const isLoading = useRef(true);

  useEffect(() => {
    if (isLoading.current) {
      isLoading.current = false;

      store.initStore();
    }
  });

  return <Canvas />;
}

export default App;

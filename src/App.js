import React, { useEffect, useState } from 'react';
import Home from './Modules/Home'
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from './hooks';

function App() {
  const [activatingConnector, setActivatingConnector] = useState();
  const { connector, active } = useWeb3React();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (active) {
      localStorage.setItem('shouldEagerConnect', true);
    }
  }, [active]);
  return (
    <div>
      <Home />
    </div>
  )
}

export default App

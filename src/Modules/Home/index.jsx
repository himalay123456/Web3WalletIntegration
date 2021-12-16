import React, { useRef, useEffect, useState } from 'react';
import Wallet from './Components/Wallet';
import { Button, Popover } from '@material-ui/core';
import { useStyles } from './styles';

// Metamask setup
import { injected } from '../../utils/connectors1';
import { useWeb3React } from '@web3-react/core';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useEagerConnect, useInactiveListener } from '../../hooks';

const Home = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //Metamask Setup
  const  { active, account, activate, deactivate, connector } = useWeb3React();
  const onboarding = useRef();
  const [activatingConnector, setActivatingConnector] = useState();

  //Persist Connection
  const triedEager = useEagerConnect();

  //For what??
  useInactiveListener(!triedEager || !!activatingConnector);


  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
    console.log(onboarding.current)
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account && account.length > 0) {
        onboarding.current.stopOnboarding();
        console.log(onboarding.current)
      } else {
        // setMetamaskButtonText(CONNECT_TEXT);
      }
    }
  }, [account]);

  //For What??
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      console.log('Connecter is same')
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);


  const handleWalletClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWalletClose = () => {
    setAnchorEl(null);
  };

  const onMetaMaskClick = async() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setActivatingConnector(injected);
      await activate(injected);
      console.log(injected);
    } else {
      onboarding.current.startOnboarding();
    }
    handleWalletClose();
    console.log('Wallet Connected');
  }
  const onDisconnectClick = async() => {
    localStorage.setItem('shouldEagerConnect', false);
    await deactivate();
    console.log('Wallet Disconnected');

  }

  return (
    <div className={classes.app}>
      { !active ? ( 
      <Button variant="contained" onClick={handleWalletClick}>Connect Wallet</Button> ):(
      <Button variant="contained" onClick={onDisconnectClick}>DisConnect Wallet</Button>
      )}
      { (active && account) && <h2> You are Connected to wallet address : {account} </h2>}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleWalletClose}
        classes={{
          root: classes.popupRoot,
          paper: classes.popupPaper,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Wallet onClose={handleClose} onMetaMaskClick={onMetaMaskClick} />
      </Popover>
    </div>
  );
}
export default Home;

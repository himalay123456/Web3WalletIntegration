import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import Icon1 from '../../../../Assets/Svg/wallet1.svg';
import Icon2 from '../../../../Assets/Svg/wallet2.svg';
import Icon3 from '../../../../Assets/Svg/wallet3.svg';
import Icon4 from '../../../../Assets/Svg/wallet4.svg';

import { useStyles } from './styles';

const Wallet = ({ onMetaMaskClick }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.app}>
      <Typography className={classes.header1}>Pick your Wallet to Connect</Typography>
      <Box className={classes.walletBox} onClick={onMetaMaskClick}>
        <img
          src={Icon1}
          className={classes.icon1}
          alt="icon1"
          loading="lazy"
        />
        <Typography className={classes.header2}>METAMASK</Typography>
      </Box>
      <Box className={classes.walletBox}>
        <img
          src={Icon2}
          className={classes.icon1}
          alt="icon1"
          loading="lazy"
        />
        <Typography className={classes.header2}>FORMATIC</Typography>
      </Box>
      <Box className={classes.walletBox}>
        <img
          src={Icon3}
          className={classes.icon1}
          alt="icon1"
          loading="lazy"
        />
        <Typography className={classes.header2}>WALLET CONNECT</Typography>
      </Box>
      <Box className={classes.walletBox}>
        <img
          src={Icon4}
          className={classes.icon1}
          alt="icon1"
          loading="lazy"
        />
        <Typography className={classes.header2}>COINBASE WALLET</Typography>
      </Box>
    </Grid>
  );
};

export default Wallet;
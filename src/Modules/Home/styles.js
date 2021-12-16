/* eslint-disable no-shadow */
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    app: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px',
    },
    popupRoot: {
        top: '10px !important',
        left: '-280px !important',
    },
    popupPaper: {
        width: '420px',
        height: '420px',
        padding: '20px',
        boxSizing: 'border-box',
        background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF)',
        border: '0.5px solid #FFFFFF',
        boxShadow: '10px 10px 21px 2px rgba(0, 0, 0, 0.22)',
        borderRadius: '69px',
      },

}));

// eslint-disable-next-line import/prefer-default-export
export { useStyles };
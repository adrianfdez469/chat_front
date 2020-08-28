import React from 'react';

import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import {Container, DialogTitle, DialogContent, DialogContentText, Grid, TextField, DialogActions, Button, Box, Typography} from '@material-ui/core';


const labels = {
    0: 'unrated',
    0.5: 'useless',
    1: 'useless+',
    1.5: 'poor',
    2: 'poor+',
    2.5: 'ok',
    3: 'ok+',
    3.5: 'good',
    4: 'good+',
    4.5: 'excellent',
    5: 'excellent+',
};
  
  const useStyles = makeStyles(theme => ({
    ratingRow: {
      width: '250px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1)
    }
  }));

const FeedbackView = React.memo(({text, idioma,
    globalState, onChange,
    comentState, onCommentChange, onSave
}) => {

    
    const classes = useStyles();

    return <Container maxWidth="sm"> 
                <DialogTitle id="form-dialog-title">{text.title[idioma]}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <RatingRowStars text={text} idioma={idioma} classes={classes} globalState={globalState} onChange={onChange} type="design"/>
                            <RatingRowStars text={text} idioma={idioma} classes={classes} globalState={globalState} onChange={onChange} type="performance"/>
                            <RatingRowStars text={text} idioma={idioma} classes={classes} globalState={globalState} onChange={onChange} type="usability"/>
                        </Grid>
                        <Grid item xs={6} style={{display:"flex"}}>
                            
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                    <div>
                                        <Typography className={classes.ratingType}>{text.lbAverage[idioma]}</Typography>
                                        <div className={classes.ratingRow}>
                                            <Rating
                                                readOnly
                                                name="hover-feedback"
                                                size="large"
                                                value={globalState.overall}
                                                precision={0.5}
                                            />
                                            {
                                                globalState.overall !== null && <Box ml={2}>{
                                                text[labels[globalState.overall]][idioma]
                                            }</Box>}
                                        </div>
                                    </div>
                                </div>
                            
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                id="outlined-textarea"
                                label={text.comment[idioma]}
                                multiline
                                variant="outlined"
                                fullWidth
                                rowsMax={4}
                                value={comentState}
                                onChange={onCommentChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                    <DialogActions>
                        <Button onClick={onSave}>
                            {text.save[idioma]}
                        </Button>
                </DialogActions>
            </Container>;

})

const RatingRowStars = React.memo(({text, idioma, classes, globalState, onChange, type }) => {
    
    const [state, setstate] = React.useState(-1);

    return <Grid item xs={12} >
            <Typography className={classes.ratingType}>{text[type][idioma]}</Typography>
            <div className={classes.ratingRow}>
                <Rating
                    value={globalState[type]}
                    precision={0.5}
                    onChange={(event, newValue) => onChange(newValue, type)}
                    onChangeActive={(event, newValue) => setstate(newValue)}
                />
                {globalState[type] !== null && <Box ml={2}>{
                    text[labels[state !== -1 ? state : globalState[type]]][idioma]
                }</Box>}
            </div>
        </Grid>
})

export default FeedbackView;
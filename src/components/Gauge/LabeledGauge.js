import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  margin: {
		margin: theme.spacing(1),
		height: 10,
    borderRadius: 20,
  },
}));

const LabeledGauge = ({ label, value, max, reverse, showPercent, ...rests }) => {
	const classes = useStyles();
	let percent = (value / max) * 100;
	(percent > 100) && (percent = 100);
	
  return (
    <Grid container className={classes.root} spacing={2}>
			<Grid item sm={3} md={2} lg={1}>
				<span>{label}: {showPercent ? percent.toFixed(0):value}</span>
			</Grid>
      <Grid item sm={9} md={10} lg={11}>
				<LinearProgress
					className={classes.margin}
					variant="determinate"
					color={ (!reverse && percent > 0) || (reverse && percent < 100) ? "primary" : "secondary" }
					value={ percent }
 					{...rests}
				/>
			</Grid>
    </Grid>
  );
};

export default LabeledGauge;

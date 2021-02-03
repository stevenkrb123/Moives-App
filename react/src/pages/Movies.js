import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AppBar, Button, Toolbar, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import mockData from './mockData.json'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    cardMedia: {
        margin: "auto",
    },
    moviesContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
      },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const { history } = props;

    const loginView = () => {
        history.push('/login')
    }

    const [moviesData, setMoviesData] = useState(mockData);





    const getMoviesCard = (moviesId) => {
        const {id} = moviesData[`${moviesId}`]
        const sprite = `https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p${id}.PNG?raw=true`
        return (
            <Grid item xs={2} key={moviesId}>
                <Card>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "100px", height: "100px" }}
                    />
                </Card>
            </Grid>
        );
    };


    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit" onClick={loginView}>Login</Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} className={classes.moviesContainer}>
                {Object.keys(moviesData).map(
                    (moviesId) =>
                    getMoviesCard(moviesId)
                )}
            </Grid>
        </>
    );
}
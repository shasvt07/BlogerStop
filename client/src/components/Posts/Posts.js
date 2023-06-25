import React, { useContext, useState } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import './togglebtn.css'




import Post from './Post/Post';
import useStyles from './styles';
import shadows from '@material-ui/core/styles/shadows';
import { SortContext } from '../../Sortcontext';

const Posts = ({ setCurrentId }) => {
  const [temp, setTemp] = useState(false);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  const {enableSort, enableSorting} = useContext(SortContext);


  if (!posts.length && !isLoading) return 'No posts';

  return (
    <>
      {isLoading ? <CircularProgress /> :
        (enableSort ?
          (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts?.sort((a, b) => a.likes.length > b.likes.length ? -1 : 1).map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </Grid>
          ) :
          (<Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts?.sort((a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
              ))}
          </Grid>)
        )}
    </>
  );

};

export default Posts;

import React, { useEffect, useState, useContext } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts';
import io from "socket.io-client";
import Posts from '../Posts/Posts';
import Pagination from '../Pagination';
import useStyles from './styles';
import './composeimage.css'
import compose from './compose.png';
import Chat from '../Chat/Chat';
import '../Chat/chat.css'
import { SortContext } from '../../Sortcontext';

const socket = io.connect("https://bloggerstopserver.onrender.com/");



function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const { enableSort, enableSorting } = useContext(SortContext);

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const joinRoom = () => {
    socket.emit("join_room", "12345"); 
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };


  return (

    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button onClick={joinRoom} class="btn btn-primary " type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Show Chat
        </button>
        <div style={{ display: 'flex', padding: "10px", width: "170px" }}>
          <label className="heart-switch" style={{ marginRight: '10px' }}>
            <input type="checkbox" onClick={enableSorting} />
            <svg viewBox="0 0 33 23" fill="b">
              <path d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"></path>
            </svg>
          </label>
          <b>Sort by likes</b>
        </div>
        </div>

        <div className="collapse collapse-horizontal" id="collapseExample" style={{ margin: '10px',position:`${window.screen.width > 400 ? 'absolute' : 'relative'}`, zIndex: 1 }}>
          {user?.result ? <Chat socket={socket} username={user?.result.name} email={user?.result.email} room={"12345"} /> :
            <div style={{ width: '200px' }}>
              <Link to="/auth">
                <button className='btn btn-danger'>SignIn To Join Chat</button>
              </Link>
            </div>
          }


      </div>
      <Grow in>

        <Container maxWidth="xl">
          <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={12}>
              <Posts setCurrentId={setCurrentId} />
              <div className="image-container">
                <Link to="/createpost" ><img src={compose} className="compose-img" style={{ borderRadius: '50px', width: '150px', right: '30px', bottom: '10px', boxShadow: "0px 0px 10px #964B00" }} />
                </Link>

              </div>
              {(!searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>

        </Container>
      </Grow>
    </div>
  );
};

export default Home;

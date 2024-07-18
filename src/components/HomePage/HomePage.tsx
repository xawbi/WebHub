import React from 'react';
import {Container, Grid} from "@mui/material";
import HomePageItem from "./HomePageItem";
import {IHomePageItemContent} from "../../models/models";
import GitHubIcon from '@mui/icons-material/GitHub';
import CasinoIcon from '@mui/icons-material/Casino';

const HomePage = () => {

  const HomePageItemContent = [
    {
      titleIcon: <GitHubIcon sx={{fontSize: '100px'}}/>,
      title: 'Finding repositories',
      link: '/GitHubSearch'
    },
    {
      titleIcon: <CasinoIcon sx={{fontSize: '100px'}}/>,
      title: 'Randomize',
      link: '/Randomize'
    },
  ]

  return (
    <Container maxWidth="xl">
    <Grid style={{margin: 0, width: '100%', marginTop: 60}}
          container>
      {HomePageItemContent.map((item: IHomePageItemContent) => <HomePageItem item={item}/>)}
    </Grid>
    </Container>
  );
};

export default HomePage;
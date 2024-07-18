import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {Card, CardContent, Grid, Icon, Typography} from "@mui/material";
import {IHomePageItemContent} from "../../models/models";

interface PropsHomePage {
  item: IHomePageItemContent
}

const HomePageItem: FC<PropsHomePage> = ({item}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{textAlign: 'center', marginBottom: 10, padding: 0}}>
      <Link to={item.link}>
        <Card sx={{
          minWidth: '70%',
          textAlign: 'center',
          display: 'inline-block',
          border: '3px solid #55B8A8',
          background: '#090915',
          transition: 'background 0.2s linear',
          '&:hover': {
            background: '#09091F',
            cursor: 'pointer',
          }, borderRadius: 8
        }}>
          <CardContent sx={{marginTop: 1}}>
            {item.titleIcon}
            <Typography sx={{fontSize: 25, marginTop: 1}}>
              {item.title}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default HomePageItem;
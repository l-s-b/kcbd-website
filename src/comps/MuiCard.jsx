import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from './Image';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function MuiCard({id, className, item}) {
  return (
    <Card id={id} className={className} sx={{ width: '16rem' }}>
      <CardActionArea>
        <Image fileName={item.filename} alt={item.name} className=" flex centerXY" style={{maxHeight: "16rem", maxWidth: "16rem"}} />
        <CardContent className="center-txt">
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
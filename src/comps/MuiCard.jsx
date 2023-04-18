import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from './Image';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MuiCard({id, className, item}) {
  return (
    <Card id={id} className={className} css2="card">
        <Link to={`/products/${item.id}`}>
            <CardActionArea>
                <Image fileName={item.filename} alt={item.name} className="flex centerXY cardImage" />
                <CardContent id={id} css="cardContent" className="center-txt flex col">
                    <label className="itemName">{item.name}</label>
                    <b className="itemPrice">${item.price}</b>
                </CardContent>
            </CardActionArea>
        </Link>
    </Card>
  );
}

import { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';

import { IMarketItem } from 'config/types';
import { Button } from 'components/Button';

const Card = styled(MuiCard)`
    max-width: 265px;
    min-width: 200px;
    border-radius: 10px;
`;

const BrokenImagePlaceholder = styled('div')({
    width: '100%',
    height: '140px',
    display: 'flex',
    alignItems: 'center',
    background: '#eee',
    borderRadius: '5px',
    justifyContent: 'center'
});

type Props = {
    data: IMarketItem;
    onSelect: () => void;
};

export const Asset = ({ data, onSelect }: Props): JSX.Element => {
    const [brokenImage, setBrokenImage] = useState<boolean>(false);

    return (
        <Card>
            {brokenImage ? (
                <BrokenImagePlaceholder>
                    <BrokenImageOutlinedIcon fontSize="large" />
                </BrokenImagePlaceholder>
            ) : (
                <CardMedia
                    sx={{ objectPosition: 'center top' }}
                    alt="T-shirt"
                    height="140"
                    image={data.image}
                    component="img"
                    onError={() => setBrokenImage(true)}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    T-shirt
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={onSelect} textId="viewDetails" />
            </CardActions>
        </Card>
    );
};

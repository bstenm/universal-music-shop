import { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';

import { IMarketItem } from 'interfaces';
import { Button as CustomButton } from 'components/Button';

const Card = styled(MuiCard)(
    ({ theme }) => `
    max-width: 265px;
    min-width: 200px;
    border-radius: 0px;
    background-color: ${theme.palette.primary.light};
`
);

const Button = styled(CustomButton)`
    margin: auto;
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
        <Card elevation={0}>
            {brokenImage ? (
                <BrokenImagePlaceholder>
                    <BrokenImageOutlinedIcon fontSize="large" />
                </BrokenImagePlaceholder>
            ) : (
                <CardMedia
                    sx={{ objectPosition: 'center top' }}
                    alt="T-shirt"
                    height="220"
                    image={data.image}
                    component="img"
                    onError={() => setBrokenImage(true)}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="body1" align="center">
                    {data.title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" onClick={onSelect} textId="viewDetails" />
            </CardActions>
        </Card>
    );
};

import { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';

const Card = styled(MuiCard)(
    ({ theme }) => `
    max-width: 265px;
    min-width: 200px;
    border-radius: 0px;
    background-color: ${theme.palette.primary.light};
`
);

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
    image: string;
    children: React.ReactNode;
};

export const Product = ({ image, children }: Props): JSX.Element => {
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
                    image={image}
                    component="img"
                    onError={() => setBrokenImage(true)}
                />
            )}
            {children}
        </Card>
    );
};

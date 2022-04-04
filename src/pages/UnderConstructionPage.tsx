import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import ConstructionIcon from '@mui/icons-material/Construction';

import { useTranslation } from 'react-i18next';

const Container = styled('div')(({ theme }) => ({
    color: theme.palette.primary.dark,
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const UnderConstructionPage = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Container>
            <Tooltip title={t('underConstruction') ?? ''}>
                <ConstructionIcon sx={{ fontSize: 120 }} />
            </Tooltip>
        </Container>
    );
};

import { useParams } from 'react-router-dom';

import { MarketItem } from 'features/marketItem/MarketItem';
// import { getProducts } from 'state/products/selectors';
// import { IMarketItem } from 'interfaces';
// import { useAppSelector } from 'hooks/useAppSelector';

export const MarketItemPage = (): JSX.Element => {
    const { itemId } = useParams<{ itemId: string }>();

    // const items: IMarketItem[] = useAppSelector(getProducts);

    return <MarketItem itemId={itemId} />;
};

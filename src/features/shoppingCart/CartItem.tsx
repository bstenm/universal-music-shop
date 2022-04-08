import grey from '@mui/material/colors/grey';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { AiOutlineMinus, AiOutlinePlus, AiTwotoneDelete } from 'react-icons/ai';

import { Space } from 'components/Space';
import { ICartItem } from 'interfaces';

type Props = {
    data: ICartItem;
    remove: () => void;
    incrementQuantity: (itemId: string | number) => void;
    decrementQuantity: (ItemId: string | number, quantity: number) => void;
};

const Row = styled(Stack)(
    ({ theme }) => `
        display: flex;
        color: ${theme.palette.primary.main}
`
);

const Data = styled(Stack)(`
    flex: 1;
`);

const Actions = styled(Stack)(`
    width: 100px;
`);

export const CartItem = ({
    data,
    remove,
    incrementQuantity,
    decrementQuantity
}: Props): JSX.Element => {
    const { id, title, image, quantity, description } = data;

    return (
        <Row direction="row" alignItems="center" spacing={4} key={id}>
            <Data direction="row" alignItems="center" spacing={2}>
                <img src={image} alt={description} width="60px" />
                <Typography variant="body1">{title}</Typography>
            </Data>
            <Actions direction="row" alignItems="center" spacing={1}>
                <AiOutlineMinus
                    size={17}
                    title="decrement"
                    color={grey[quantity > 0 ? 600 : 400]}
                    onClick={() => decrementQuantity(id, quantity)}
                />
                <Typography variant="h5" color="secondary">
                    {quantity}
                </Typography>
                <AiOutlinePlus
                    size={17}
                    title="increment"
                    color={grey[600]}
                    onClick={() => incrementQuantity(id)}
                />
                <Space width="10px" />
                <AiTwotoneDelete size={22} onClick={remove} />
            </Actions>
        </Row>
    );
};

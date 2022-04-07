import grey from '@mui/material/colors/grey';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiTwotoneDelete } from 'react-icons/ai';

import { ICartItem } from 'interfaces';

type Props = {
    data: ICartItem;
    remove: () => void;
    incrementQuantity: (itemId: string | number) => void;
    decrementQuantity: (ItemId: string | number, quantity: number) => void;
};

const Row = styled(Stack)(
    ({ theme }) => `
        color: ${theme.palette.primary.main}
`
);

export const CartItem = ({
    data,
    remove,
    incrementQuantity,
    decrementQuantity
}: Props): JSX.Element => {
    const { id, title, image, quantity, description } = data;

    return (
        <Row direction="row" alignItems="center" spacing={4} key={id}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <img src={image} alt={description} width="60px" />
                <Typography variant="body1">{title}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
                <AiOutlineMinusCircle
                    size={20}
                    title="decrement"
                    color={grey[quantity > 0 ? 600 : 400]}
                    onClick={() => decrementQuantity(id, quantity)}
                />
                <Typography variant="h5" color="secondary">
                    {quantity}
                </Typography>
                <AiOutlinePlusCircle
                    size={20}
                    title="increment"
                    color={grey[600]}
                    onClick={() => incrementQuantity(id)}
                />
                <AiTwotoneDelete onClick={remove} />
            </Stack>
        </Row>
    );
};

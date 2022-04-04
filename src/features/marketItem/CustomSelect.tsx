import range from 'lodash/range';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';

const Select = styled(MuiSelect)`
    color: #fff;
    & .MuiSelect-icon {
        color: #fff;
    }
`;

type Props = {
    max: number;
    type: string;
    onSelect: (value: number) => void;
};

export const CustomSelect = ({ type, max, onSelect }: Props): JSX.Element => {
    const [val, setVal] = useState<number>(1);

    const handleChange = (e: SelectChangeEvent<unknown>): void => {
        const { value } = e.target;
        setVal(value as number);
        onSelect(value as number);
    };

    return (
        <FormControl>
            <Select id={`${type}-select`} size="small" value={val} onChange={handleChange}>
                {range(1, max + 1).map((e) => (
                    <MenuItem key={e} value={e}>
                        {e}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

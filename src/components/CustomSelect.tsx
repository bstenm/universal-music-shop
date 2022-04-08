import range from 'lodash/range';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
    max: number;
    type: string;
    onSelect: (value: number) => void;
};

/**
 * Standard select logic to use across the app
 */
export const CustomSelect = ({ type, max, onSelect }: Props): JSX.Element => {
    const [val, setVal] = useState<number>(1);

    const handleChange = (e: SelectChangeEvent<unknown>): void => {
        const { value } = e.target;
        setVal(value as number);
        onSelect(value as number);
    };

    return (
        <FormControl size="small">
            <Select id={`${type}-select`} value={val} onChange={handleChange}>
                {range(1, max + 1).map((e) => (
                    <MenuItem key={e} value={e}>
                        {e}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

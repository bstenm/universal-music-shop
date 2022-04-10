import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import SelectUnstyled, {
    SelectUnstyledProps,
    selectUnstyledClasses
} from '@mui/base/SelectUnstyled';

import { languages, defaultLang } from 'config';
import { LangContext, LangContextType } from 'libs/contexts';

const Button = styled('button')(
    ({ theme }) => `
  box-sizing: border-box;
  cursor: pointer;
  width: 45px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  padding: 5px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: left;
  background: ${theme.palette.primary.light};
  color: ${theme.palette.primary.main};
  &:hover {
    padding-bottom: 7px;
    border-bottom: 1px solid ${theme.palette.primary.main};
  }
  &.${selectUnstyledClasses.expanded} {
    &::after {
        margin-top: 2px;
        font-size: 13px;
        content: '▴';
    }
  }
  &::after {
        margin-top: 2px;
        font-size: 13px;
        content: '▾';
        float: right;
  }
  `
);

const Listbox = styled('ul')`
    margin: 0;
    box-sizing: border-box;
    padding: 0px;
    background: #fff;
    color: ${grey[900]};
    overflow: auto;
    outline: 0px;
`;

const Option = styled(OptionUnstyled)(
    ({ theme }) => `
  list-style: none;
  padding: 8px 15px;
  cursor: pointer;
  &.${optionUnstyledClasses.selected} {
    color: ${theme.palette.primary.main};
  }
  &.${optionUnstyledClasses.highlighted} {
    color: ${theme.palette.primary.main};
  }
  &.${optionUnstyledClasses.selected} {
    color: ${theme.palette.primary.main};
  }
  &.${optionUnstyledClasses.highlighted} {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }
  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }
  &:hover {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }
  `
);

const Popper = styled(PopperUnstyled)`
    z-index: 1;
`;

const CustomSelect = (
    props: SelectUnstyledProps<string> & React.RefAttributes<HTMLElement>
): JSX.Element => {
    const components = {
        Root: Button,
        Listbox,
        Popper
    };

    return <SelectUnstyled {...props} components={components} />;
};

CustomSelect.muiName = 'Select';

/**
 * The drop down that gives the ability to set the language used across the app
 */
export const LanguageSelect = (): JSX.Element => {
    const [lang, setLang] = useContext<LangContextType>(LangContext);

    const handleChange = (value: string | null): void => {
        setLang(value ?? defaultLang);
    };

    return (
        <CustomSelect value={lang} onChange={handleChange}>
            {languages.map((e: string) => (
                <Option key={e} value={e}>
                    {e}
                </Option>
            ))}
        </CustomSelect>
    );
};

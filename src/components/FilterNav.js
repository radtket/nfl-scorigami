import React, { useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import {
  SINGLE_SELECT_OPTIONS,
  MULTI_SELECT_OPTIONS,
} from '../constants/modes';

const FilterNav = () => {
  const [multiSelect, setMultiSelect] = useState([]);
  const [singleSelect, setSingleSelect] = useState(SINGLE_SELECT_OPTIONS[1]);

  return (
    <div className="col-12">
      <Toolbar
        end={
          <Dropdown
            className="w-full md:w-14rem"
            onChange={e => {
              return setSingleSelect(e.value);
            }}
            optionLabel="name"
            options={SINGLE_SELECT_OPTIONS}
            value={singleSelect}
          />
        }
        start={
          <SelectButton
            multiple
            onChange={e => {
              return setMultiSelect(e.value);
            }}
            optionLabel="name"
            options={MULTI_SELECT_OPTIONS}
            value={multiSelect}
          />
        }
      />
    </div>
  );
};

export default FilterNav;

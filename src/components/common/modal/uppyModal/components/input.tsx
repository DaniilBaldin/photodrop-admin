import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchHook } from '~/components/hooks/fetchHook';
import { RootState } from '~/store';
import { token } from '~/store/selectors/tokenSelector';

import { Footer, Input, P, CopyButton } from './inputStyles';

import { ClientResponse, ClientsResponse } from '~/api/types/clients';

type Value = null | { value: string; label: string } | Array<{ value: string; label: string }>;
type ValueSingle = { value: string; label: string };

export const InputSelect = () => {
  const [numbers, setNumbers] = useState<Value>();
  const state = useSelector((state) => (state as RootState).tokenReducer);
  const jwtToken = token(state);
  const method = 'GET';
  const slug = 'clients';
  const header = { Authorization: `Bearer ${jwtToken}` };

  // const { data } = fetchHook<ClientsResponse>(method, slug, undefined, header);
  const clientNumbers: ValueSingle[] = [];

  // if (data?.success) {
  //     data.data.map((e: ClientResponse) => {
  //         clientNumbers.push({
  //             value: e.phone_number,
  //             label: e.phone_number,
  //         });
  //     });
  // }

  const handleInput = (value: Value) => {
    setNumbers(value);
  };

  const saveHandler = () => {
    const valueNumbers: string[] = [];
    if (Array(numbers)) {
      (numbers as [ValueSingle])?.forEach((e: ValueSingle) => {
        valueNumbers.push(e?.value);
      });
      navigator.clipboard.writeText(valueNumbers.join(', '));
    } else {
      navigator.clipboard.writeText((numbers as ValueSingle).value);
    }
  };
  return (
    <Footer onClick={(e: { stopPropagation: () => unknown }) => e.stopPropagation()}>
      <P>Phone selector</P>
      <Input
        isMulti
        name="Phone Numbers"
        placeholder={'+380 format, please.'}
        options={clientNumbers}
        openMenuOnClick={false}
        isClearable={true}
        onChange={(value) => {
          handleInput(value as Value);
        }}
      />
      <CopyButton onClick={saveHandler}>Copy Phone</CopyButton>
    </Footer>
  );
};

import React, { useState } from 'react';

import { fetchHook } from '~/components/hooks/fetchHook';
import { tokenSelector } from '~/store/selectors/tokenSelector';

import { Footer, Input, P, CopyButton } from './inputStyles';
import { Selector } from '~/store/hooks/hooks';

type Value = null | { value: string; label: string } | Array<{ value: string; label: string }>;
type ValueSingle = { value: string; label: string };

type Data = {
  users: {
    id: number;
    phoneNumber: string;
  }[];

  success: boolean;
};

type User = {
  id: number;
  phoneNumber: string;
};

export const InputSelect = () => {
  const [numbers, setNumbers] = useState<Value>();

  const jwtToken = Selector(tokenSelector);

  const method = 'GET';
  const slug = 'photographer/get-users?limit=100&page=0';
  const header = { Authorization: `Bearer ${jwtToken}` };

  const { data } = fetchHook<Data>(method, slug, undefined, header);
  const clientNumbers: ValueSingle[] = [];

  if (data?.success) {
    console.log(data);
    data.users.map((e: User) => {
      clientNumbers.push({
        value: e.phoneNumber,
        label: e.phoneNumber,
      });
    });
  }

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

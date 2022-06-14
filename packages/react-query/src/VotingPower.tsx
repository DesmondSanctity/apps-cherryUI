// Copyright 2017-2022 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';

import React from 'react';

import { useApi } from '@polkadot/react-hooks';

import FormatBalance from './FormatBalance';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  params?: AccountId[] | AccountIndex | Address | string | Uint8Array | null;
}

function VotingPowerDisplay ({ children, className = '', label, params }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const votingPower = (api.query.council?.votingPower, [params]);
  console.log(votingPower)

  return (
    <FormatBalance
      className={className}
      label={label}
      value={votingPower}
    >
      {children}
    </FormatBalance>
  );
}

export default React.memo(VotingPowerDisplay);

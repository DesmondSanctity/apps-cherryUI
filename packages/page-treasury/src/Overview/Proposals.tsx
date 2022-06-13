// Copyright 2017-2022 @polkadot/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveTreasuryProposal } from '@polkadot/api-derive/types';

import React, { useMemo } from 'react';

import { Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Proposal from './Proposal';

interface Props {
  className?: string;
  isApprovals?: boolean;
  type?: 'proposals' | 'approvals' | 'segments';
  isMember: boolean;
  members: string[];
  proposals?: DeriveTreasuryProposal[];
}

function ProposalsBase ({ className = '', isApprovals, isMember, members, proposals, type = 'proposals' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const headerText = useMemo(() => ({
    approvals: t<string>('Approved'),
    proposals: t<string>('Proposals'),
    segments: t<string>('Segments')
  }), [t]);

  const emptyText = useMemo(() => ({
    approvals: t<string>('No pending proposals'),
    proposals: t<string>('No approved proposals'),
    segments: t<string>('No pending segments')
  }), [t]);

  const header = useMemo(() => [
    [headerText[type], 'start', 2],
    [t('beneficiary'), 'address'],
    [t('payment')],
    [t('bond')],
    [],
    []
  ], [headerText, t, type]);

  return (
    <Table
      className={className}
      empty={proposals && emptyText[type]}
      header={header}
    >
      {proposals?.map((proposal): React.ReactNode => (
        <Proposal
          isMember={isMember}
          key={proposal.id.toString()}
          members={members}
          proposal={proposal}
          withSend={!isApprovals}
        />
      ))}
    </Table>
  );
}

export default React.memo(ProposalsBase);

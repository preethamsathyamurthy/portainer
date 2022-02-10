import { createRowContext } from '@/portainer/components/datatables/RowContext';

interface RowContextState {
  disableTrustOnFirstConnect: boolean;
  isOpenAmtEnabled: boolean;
}

const { RowProvider, useRowContext } = createRowContext<RowContextState>();

export { RowProvider, useRowContext };

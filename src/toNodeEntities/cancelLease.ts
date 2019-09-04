import { TYPES } from '../constants';
import { ICancelLeaseTransaction } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop } from '../utils';
import { TWithPartialFee } from '../types';


export const cancelLease = factory<IAcrylGuiCancelLease, TWithPartialFee<ICancelLeaseTransaction<string>>>({
    ...getDefaultTransform(),
    leaseId: prop('leaseId'),
    chainId: prop('chainId')
});

export interface IAcrylGuiCancelLease extends IDefaultGuiTx<typeof TYPES.CANCEL_LEASE> {
    leaseId: string;
    chainId: number;
}
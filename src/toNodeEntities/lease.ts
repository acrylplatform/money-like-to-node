import { TYPES } from '../constants';
import { ILeaseTransaction } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getCoins, pipe, prop } from '../utils';


export const lease = factory<IAcrylGuiLease, TWithPartialFee<ILeaseTransaction<string>>>({
    ...getDefaultTransform(),
    amount: pipe<IAcrylGuiLease, TMoney, string>(prop('amount'), getCoins),
    recipient: prop('recipient')
});

export interface IAcrylGuiLease extends IDefaultGuiTx<typeof TYPES.LEASE> {
    amount: TMoney;
    recipient: string;
}
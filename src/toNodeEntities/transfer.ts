import { TYPES } from '../constants';
import { ITransferTransaction } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { defaultTo, getAssetId, getCoins, pipe, prop } from '../utils';


export const transfer = factory<IAcrylGuiTransfer, TWithPartialFee<ITransferTransaction<string>>>({
    ...getDefaultTransform(),
    recipient: prop('recipient'),
    amount: pipe<IAcrylGuiTransfer, TMoney, string>(prop('amount'), getCoins),
    feeAssetId: pipe<IAcrylGuiTransfer, TMoney | TLong | undefined | null, string | null, string>(prop('fee'), getAssetId, defaultTo('WAVES')),
    assetId: pipe(prop('amount'), getAssetId),
    attachment: pipe(prop('attachment'), defaultTo('')),
});

export interface IAcrylGuiTransfer extends IDefaultGuiTx<typeof TYPES.TRANSFER> {
    recipient: string;
    amount: TMoney;
    attachment?: string;
}

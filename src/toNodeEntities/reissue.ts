import { TYPES } from '../constants';
import { IReissueTransaction } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { emptyError, getAssetId, getCoins, has, ifElse, pipe, prop } from '../utils';

export const reissue = factory<TAcrylGuiReissue, TWithPartialFee<IReissueTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: pipe<TAcrylGuiReissue, string, string>(
        ifElse<TAcrylGuiReissue, string, string>(
            has('assetId'),
            prop<any, 'assetId'>('assetId'),
            pipe<any, TMoney, string>(
                prop('quantity'),
                getAssetId
            )
        ),
        emptyError('Has no assetId!')
    ),
    quantity: pipe<TAcrylGuiReissue, TMoney | TLong, string>(prop('quantity'), getCoins),
    reissuable: prop('reissuable'),
    chainId: prop('chainId'),
});

export interface IAcrylGuiReissueMoney extends IDefaultGuiTx<typeof TYPES.REISSUE> {
    quantity: TMoney;
    reissuable: boolean;
    chainId: number;
}

export interface IAcrylGuiReissueLong extends IDefaultGuiTx<typeof TYPES.REISSUE> {
    assetId: string;
    quantity: TLong;
    reissuable: boolean;
    chainId: number;
}

export type TAcrylGuiReissue = IAcrylGuiReissueMoney | IAcrylGuiReissueLong;

import { TYPES } from '../constants';
import { IBurnTransaction } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { emptyError, getAssetId, getCoins, has, ifElse, pipe, prop } from '../utils';


export const burn = factory<TAcrylGuiBurn, TWithPartialFee<IBurnTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: pipe<TAcrylGuiBurn, string, string>(
        ifElse<TAcrylGuiBurn, string, string>(
            has('assetId'),
            prop<any, 'assetId'>('assetId'),
            pipe<any, TMoney, string>(
                prop<IAcrylGuiBurnMoney, 'quantity'>('quantity'),
                getAssetId
            )
        ),
        emptyError('Has no assetId!')
    ),
    quantity: pipe<TAcrylGuiBurn, TMoney | TLong, string>(prop('quantity'), getCoins),
    chainId: prop('chainId')
});

export interface IAcrylGuiBurnMoney extends IDefaultGuiTx<typeof TYPES.BURN> {
    quantity: TMoney;
    chainId: number;
}

export interface IAcrylGuiBurnLong extends IDefaultGuiTx<typeof TYPES.BURN> {
    quantity: TLong;
    assetId: string;
    chainId: number;
}

export type TAcrylGuiBurn = IAcrylGuiBurnMoney | IAcrylGuiBurnLong;

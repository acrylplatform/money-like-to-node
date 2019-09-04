import { TYPES } from '../constants';
import { IMassTransferItem, IMassTransferTransaction } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { emptyError, getAssetId, getCoins, has, ifElse, map, pipe, prop } from '../utils';


const remapTransferItem = factory<IAcrylGuiMassTransferItem<TMoney | TLong>, IMassTransferItem<string>>({
    recipient: prop('recipient'),
    amount: pipe<IAcrylGuiMassTransferItem<TMoney | TLong>, TMoney | TLong, string>(prop('amount'), getCoins)
});

const getFirstMassTransferItem = (list: Array<IAcrylGuiMassTransferItem<TMoney>>): IAcrylGuiMassTransferItem<TMoney> => {
    if (!list.length) {
        throw new Error('MassTransfer transaction must have one transfer!');
    }
    return list[0];
};

export const massTransfer = factory<TAcrylGuiMassTransfer, TWithPartialFee<IMassTransferTransaction<string>>>({
    ...getDefaultTransform(),
    transfers: pipe(prop('transfers'), map(remapTransferItem)),
    assetId: pipe<TAcrylGuiMassTransfer, string, string>(
        ifElse<TAcrylGuiMassTransfer, string, string>(
            has('assetId'),
            prop<any, 'assetId'>('assetId'),
            pipe<any, Array<IAcrylGuiMassTransferItem<TMoney>>, IAcrylGuiMassTransferItem<TMoney>, TMoney, string>(
                prop<any, 'transfers'>('transfers'),
                getFirstMassTransferItem,
                prop<IAcrylGuiMassTransferItem<TMoney>, 'amount'>('amount'),
                getAssetId
            )
        ),
        emptyError('Has no assetId!')
    ),
    attachment: prop('attachment')
});

export interface IAcrylGuiMassTransferMoney extends IDefaultGuiTx<typeof TYPES.MASS_TRANSFER> {
    attachment?: string;
    transfers: Array<IAcrylGuiMassTransferItem<TMoney>>;
}

export interface IAcrylGuiMassTransferLong extends IDefaultGuiTx<typeof TYPES.MASS_TRANSFER> {
    attachment?: string;
    assetId: string;
    transfers: Array<IAcrylGuiMassTransferItem<TLong>>;
}

export type TAcrylGuiMassTransfer = IAcrylGuiMassTransferMoney | IAcrylGuiMassTransferLong;

interface IAcrylGuiMassTransferItem<T extends TMoney | TLong> {
    recipient: string;
    amount: T;
}

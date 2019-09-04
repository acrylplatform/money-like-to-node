import { TYPES } from '../constants';
import { IExchangeTransaction, IExchangeTransactionOrderWithProofs } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getAssetId, getCoins, pipe, prop } from '../utils';


const getAssetPair = factory<IAcrylGuiExchangeOrder, { amountAsset: string; priceAsset: string; }>({
    amountAsset: pipe<IAcrylGuiExchangeOrder, TMoney, string>(prop('amount'), getAssetId),
    priceAsset: pipe<IAcrylGuiExchangeOrder, TMoney, string>(prop('price'), getAssetId)
});

export const remapOrder = factory<IAcrylGuiExchangeOrder, IExchangeTransactionOrderWithProofs<string>>({
    version: prop('version'),
    matcherPublicKey: prop('matcherPublicKey'),
    orderType: prop('orderType'),
    timestamp: prop('timestamp'),
    expiration: prop('expiration'),
    senderPublicKey: prop('senderPublicKey'),
    proofs: prop('proofs'),
    price: pipe<IAcrylGuiExchangeOrder, TMoney, string>(prop('price'), getCoins),
    amount: pipe<IAcrylGuiExchangeOrder, TMoney, string>(prop('amount'), getCoins),
    matcherFee: pipe<IAcrylGuiExchangeOrder, TMoney, string>(prop('matcherFee'), getCoins),
    matcherFeeAssetId: pipe<IAcrylGuiExchangeOrder, TMoney, string>(prop('matcherFee'), getAssetId),
    assetPair: getAssetPair
});

export const exchange = factory<IAcrylGuiExchange, TWithPartialFee<IExchangeTransaction<string>>>({
    ...getDefaultTransform(),
    buyOrder: pipe(prop('buyOrder'), remapOrder),
    sellOrder: pipe(prop('sellOrder'), remapOrder),
    price: pipe<IAcrylGuiExchange, TLong, string>(prop('price'), getCoins),
    amount: pipe<IAcrylGuiExchange, TLong, string>(prop('amount'), getCoins),
    buyMatcherFee: pipe<IAcrylGuiExchange, TMoney, string>(prop('buyMatcherFee'), getCoins),
    sellMatcherFee: pipe<IAcrylGuiExchange, TMoney, string>(prop('sellMatcherFee'), getCoins),
});

export interface IAcrylGuiExchange extends IDefaultGuiTx<typeof TYPES.EXCHANGE> {
    buyOrder: IAcrylGuiExchangeOrder;
    sellOrder: IAcrylGuiExchangeOrder;
    price: TLong;
    amount: TLong;
    buyMatcherFee: TMoney;
    sellMatcherFee: TMoney;
}

export interface IAcrylGuiExchangeOrder {
    version: number;
    matcherPublicKey: string;
    orderType: 'buy' | 'sell';
    price: TMoney;
    amount: TMoney;
    matcherFee: TMoney;
    timestamp: number;
    expiration: number;
    senderPublicKey: string;
    proofs: Array<string>;
}

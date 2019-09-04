import { alias, IAcrylGuiAlias } from './alias';
import { burn, TAcrylGuiBurn } from './burn';
import { cancelLease, IAcrylGuiCancelLease } from './cancelLease';
import { data, IAcrylGuiData } from './data';
import { exchange, remapOrder as order, IAcrylGuiExchangeOrder, IAcrylGuiExchange } from './exchange';
import { issue, IAcrylGuiIssue } from './issue';
import { reissue, TAcrylGuiReissue } from './reissue';
import { lease, IAcrylGuiLease } from './lease';
import { massTransfer, TAcrylGuiMassTransfer } from './massTransfer';
import { setAssetScript, IAcrylGuiSetAssetScript } from './setAssetScript';
import { setScript, IAcrylGuiSetScript } from './setScript';
import { sponsorship, IAcrylGuiSponsorship } from './sponsorship';
import { transfer, IAcrylGuiTransfer } from './transfer';
import { IExchangeTransactionOrderWithProofs, TTransaction, TTransactionMap } from '@acryl/ts-types';
import { TYPES } from '../constants';
import { TWithPartialFee } from '../types';
import { isOrder } from '../utils';
import { invokeScript, IAcrylGuiInvokeScript } from './invokeScript';


export const node = {
    alias, burn, cancelLease,
    data, exchange, issue,
    reissue, lease, massTransfer,
    setAssetScript, setScript, sponsorship,
    transfer, order, invokeScript
};

export {
    IAcrylGuiAlias,
    TAcrylGuiBurn,
    IAcrylGuiCancelLease,
    IAcrylGuiData,
    IAcrylGuiExchange,
    IAcrylGuiIssue,
    TAcrylGuiReissue,
    IAcrylGuiLease,
    TAcrylGuiMassTransfer,
    IAcrylGuiSetAssetScript,
    IAcrylGuiSetScript,
    IAcrylGuiSponsorship,
    IAcrylGuiTransfer,
};

export function toNode(item: IAcrylGuiExchangeOrder): IExchangeTransactionOrderWithProofs<string>;
export function toNode<TX extends TAcrylGuiEntity, TYPE extends TX['type'] = TX['type']>(item: TX): TWithPartialFee<TTransactionMap<string>[TYPE]>;
export function toNode(item: TAcrylGuiEntity | IAcrylGuiExchangeOrder): TWithPartialFee<TTransaction<string>> | IExchangeTransactionOrderWithProofs<string> {

    if (isOrder(item)) {
        return order(item);
    }

    switch (item.type) {
        case TYPES.ISSUE:
            return issue(item);
        case TYPES.TRANSFER:
            return transfer(item);
        case TYPES.REISSUE:
            return reissue(item);
        case TYPES.BURN:
            return burn(item);
        case TYPES.EXCHANGE:
            return exchange(item);
        case TYPES.LEASE:
            return lease(item);
        case TYPES.CANCEL_LEASE:
            return cancelLease(item);
        case TYPES.ALIAS:
            return alias(item);
        case TYPES.MASS_TRANSFER:
            return massTransfer(item);
        case TYPES.DATA:
            return data(item);
        case TYPES.SET_SCRIPT:
            return setScript(item);
        case TYPES.SPONSORSHIP:
            return sponsorship(item);
        case TYPES.SET_ASSET_SCRIPT:
            return setAssetScript(item);
        case TYPES.INVOKE_SCRIPT:
            return invokeScript(item);
        default:
            throw new Error('Unknown transaction type!');
    }
}


export type TAcrylGuiEntity = IAcrylGuiAlias
    | TAcrylGuiBurn
    | IAcrylGuiCancelLease
    | IAcrylGuiData
    | IAcrylGuiExchange
    | IAcrylGuiIssue
    | TAcrylGuiReissue
    | IAcrylGuiLease
    | TAcrylGuiMassTransfer
    | IAcrylGuiSetAssetScript
    | IAcrylGuiSetScript
    | IAcrylGuiSponsorship
    | IAcrylGuiTransfer
    | IAcrylGuiInvokeScript;
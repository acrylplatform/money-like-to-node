import { TYPES } from '../constants';
import { IIssueTransaction } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { TLong, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getCoins, pipe, prop } from '../utils';



export const issue = factory<IAcrylGuiIssue, TWithPartialFee<IIssueTransaction<string>>>({
    ...getDefaultTransform(),
    name: prop('name'),
    description: prop('description'),
    decimals: prop('precision'),
    quantity: pipe<IAcrylGuiIssue, TLong, string>(prop('quantity'), getCoins),
    reissuable: prop('reissuable'),
    chainId: prop('chainId'),
    script: prop('script'),
});

export interface IAcrylGuiIssue extends IDefaultGuiTx<typeof TYPES.ISSUE> {
    name: string;
    description: string;
    precision: number;
    quantity: TLong;
    reissuable: boolean;
    chainId: number;
    script?: string | null;
}
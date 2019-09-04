import { TYPES } from '../constants';
import { ISetScriptTransaction } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop } from '../utils';
import { TWithPartialFee } from '../types';


export const setScript = factory<IAcrylGuiSetScript, TWithPartialFee<ISetScriptTransaction<string>>>({
    ...getDefaultTransform(),
    script: prop('script'),
    chainId: prop('chainId'),
});

export interface IAcrylGuiSetScript extends IDefaultGuiTx<typeof TYPES.SET_SCRIPT> {
    script: string | null;
    chainId: number;
}

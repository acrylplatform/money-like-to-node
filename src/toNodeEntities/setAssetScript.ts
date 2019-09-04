import { TYPES } from '../constants';
import { ISetAssetScriptTransaction } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop } from '../utils';
import { TWithPartialFee } from '../types';


export const setAssetScript = factory<IAcrylGuiSetAssetScript, TWithPartialFee<ISetAssetScriptTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: prop('assetId'),
    script: prop('script'),
    chainId: prop('chainId'),
});

export interface IAcrylGuiSetAssetScript extends IDefaultGuiTx<typeof TYPES.SET_ASSET_SCRIPT> {
    assetId: string;
    script: string;
    chainId: number;
}
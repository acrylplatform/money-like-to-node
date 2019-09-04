import { TYPES } from '../constants';
import { ISponsorshipTransaction } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getAssetId, getCoins, pipe, prop } from '../utils';


export const sponsorship = factory<IAcrylGuiSponsorship, TWithPartialFee<ISponsorshipTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: pipe<IAcrylGuiSponsorship, TMoney, string>(prop('minSponsoredAssetFee'), getAssetId),
    minSponsoredAssetFee: pipe<IAcrylGuiSponsorship, TMoney, string>(prop('minSponsoredAssetFee'), getCoins)
});

export interface IAcrylGuiSponsorship extends IDefaultGuiTx<typeof TYPES.SPONSORSHIP> {
    minSponsoredAssetFee: TMoney;
}

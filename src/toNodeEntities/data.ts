import { TYPES } from '../constants';
import { DATA_FIELD_TYPE, IDataTransaction, TDataTransactionEntry } from '@acryl/ts-types';
import { factory } from '../core/factory';
import { TLong, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getCoins, map, pipe, prop } from '../utils';


const parseValueByType = (item: TAcrylGuiDataTransactionEntry): TDataTransactionEntry<string>['value'] => {
    switch (item.type) {
        case DATA_FIELD_TYPE.BINARY:
        case DATA_FIELD_TYPE.STRING:
        case DATA_FIELD_TYPE.BOOLEAN:
            return item.value;
        case DATA_FIELD_TYPE.INTEGER:
            return getCoins(item.value);
    }
};

const remapDataEntryItem = (item: TAcrylGuiDataTransactionEntry): TDataTransactionEntry<string> => ({
    key: prop('key', item),
    type: prop('type', item),
    value: parseValueByType(item)
}) as TDataTransactionEntry<string>;

export const data = factory<IAcrylGuiData, TWithPartialFee<IDataTransaction<string>>>({
    ...getDefaultTransform(),
    data: pipe(prop('data'), map(remapDataEntryItem))
});

export interface IAcrylGuiData extends IDefaultGuiTx<typeof TYPES.DATA> {
    data: Array<TAcrylGuiDataTransactionEntry>;
}

type TAcrylGuiDataTransactionEntry =
    IAcrylGuiDataTransactionEntryInteger |
    IAcrylGuiDataTransactionEntryBoolean |
    IAcrylGuiDataTransactionEntryString |
    IAcrylGuiDataTransactionEntryBinary;

interface IAcrylGuiDataTransactionEntryInteger {
    key: string;
    type: typeof DATA_FIELD_TYPE.INTEGER;
    value: TLong;
}

interface IAcrylGuiDataTransactionEntryBoolean {
    key: string;
    type: typeof DATA_FIELD_TYPE.BOOLEAN;
    value: boolean;
}

interface IAcrylGuiDataTransactionEntryString {
    key: string;
    type: typeof DATA_FIELD_TYPE.STRING;
    value: string;
}

interface IAcrylGuiDataTransactionEntryBinary {
    key: string;
    type: typeof DATA_FIELD_TYPE.BINARY;
    value: string;
}

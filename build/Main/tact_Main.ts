import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    address, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Order = {
    $$type: 'Order';
    id: bigint;
    timestamp: bigint;
    user_id: Address;
    amount: bigint;
    price: bigint;
    is_buy: boolean;
    is_paired: boolean | null;
    base_token: bigint;
    quote_token: bigint;
}

export function storeOrder(src: Order) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeUint(src.timestamp, 64);
        b_0.storeAddress(src.user_id);
        b_0.storeUint(src.amount, 32);
        b_0.storeUint(src.price, 32);
        b_0.storeBit(src.is_buy);
        if (src.is_paired !== null && src.is_paired !== undefined) { b_0.storeBit(true).storeBit(src.is_paired); } else { b_0.storeBit(false); }
        b_0.storeUint(src.base_token, 32);
        b_0.storeUint(src.quote_token, 32);
    };
}

export function loadOrder(slice: Slice) {
    const sc_0 = slice;
    const _id = sc_0.loadUintBig(32);
    const _timestamp = sc_0.loadUintBig(64);
    const _user_id = sc_0.loadAddress();
    const _amount = sc_0.loadUintBig(32);
    const _price = sc_0.loadUintBig(32);
    const _is_buy = sc_0.loadBit();
    const _is_paired = sc_0.loadBit() ? sc_0.loadBit() : null;
    const _base_token = sc_0.loadUintBig(32);
    const _quote_token = sc_0.loadUintBig(32);
    return { $$type: 'Order' as const, id: _id, timestamp: _timestamp, user_id: _user_id, amount: _amount, price: _price, is_buy: _is_buy, is_paired: _is_paired, base_token: _base_token, quote_token: _quote_token };
}

function loadTupleOrder(source: TupleReader) {
    const _id = source.readBigNumber();
    const _timestamp = source.readBigNumber();
    const _user_id = source.readAddress();
    const _amount = source.readBigNumber();
    const _price = source.readBigNumber();
    const _is_buy = source.readBoolean();
    const _is_paired = source.readBooleanOpt();
    const _base_token = source.readBigNumber();
    const _quote_token = source.readBigNumber();
    return { $$type: 'Order' as const, id: _id, timestamp: _timestamp, user_id: _user_id, amount: _amount, price: _price, is_buy: _is_buy, is_paired: _is_paired, base_token: _base_token, quote_token: _quote_token };
}

function loadGetterTupleOrder(source: TupleReader) {
    const _id = source.readBigNumber();
    const _timestamp = source.readBigNumber();
    const _user_id = source.readAddress();
    const _amount = source.readBigNumber();
    const _price = source.readBigNumber();
    const _is_buy = source.readBoolean();
    const _is_paired = source.readBooleanOpt();
    const _base_token = source.readBigNumber();
    const _quote_token = source.readBigNumber();
    return { $$type: 'Order' as const, id: _id, timestamp: _timestamp, user_id: _user_id, amount: _amount, price: _price, is_buy: _is_buy, is_paired: _is_paired, base_token: _base_token, quote_token: _quote_token };
}

function storeTupleOrder(source: Order) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.timestamp);
    builder.writeAddress(source.user_id);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.price);
    builder.writeBoolean(source.is_buy);
    builder.writeBoolean(source.is_paired);
    builder.writeNumber(source.base_token);
    builder.writeNumber(source.quote_token);
    return builder.build();
}

function dictValueParserOrder(): DictionaryValue<Order> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOrder(src)).endCell());
        },
        parse: (src) => {
            return loadOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateOrder = {
    $$type: 'CreateOrder';
    order: Order;
}

export function storeCreateOrder(src: CreateOrder) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2954005795, 32);
        b_0.store(storeOrder(src.order));
    };
}

export function loadCreateOrder(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2954005795) { throw Error('Invalid prefix'); }
    const _order = loadOrder(sc_0);
    return { $$type: 'CreateOrder' as const, order: _order };
}

function loadTupleCreateOrder(source: TupleReader) {
    const _order = loadTupleOrder(source);
    return { $$type: 'CreateOrder' as const, order: _order };
}

function loadGetterTupleCreateOrder(source: TupleReader) {
    const _order = loadGetterTupleOrder(source);
    return { $$type: 'CreateOrder' as const, order: _order };
}

function storeTupleCreateOrder(source: CreateOrder) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTupleOrder(source.order));
    return builder.build();
}

function dictValueParserCreateOrder(): DictionaryValue<CreateOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateOrder(src.loadRef().beginParse());
        }
    }
}

export type RemoveOrder = {
    $$type: 'RemoveOrder';
    order_id: bigint;
}

export function storeRemoveOrder(src: RemoveOrder) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2820521053, 32);
        b_0.storeUint(src.order_id, 32);
    };
}

export function loadRemoveOrder(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2820521053) { throw Error('Invalid prefix'); }
    const _order_id = sc_0.loadUintBig(32);
    return { $$type: 'RemoveOrder' as const, order_id: _order_id };
}

function loadTupleRemoveOrder(source: TupleReader) {
    const _order_id = source.readBigNumber();
    return { $$type: 'RemoveOrder' as const, order_id: _order_id };
}

function loadGetterTupleRemoveOrder(source: TupleReader) {
    const _order_id = source.readBigNumber();
    return { $$type: 'RemoveOrder' as const, order_id: _order_id };
}

function storeTupleRemoveOrder(source: RemoveOrder) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.order_id);
    return builder.build();
}

function dictValueParserRemoveOrder(): DictionaryValue<RemoveOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveOrder(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveOrder(src.loadRef().beginParse());
        }
    }
}

export type Pair = {
    $$type: 'Pair';
    pair_id: bigint;
    buy_order_id: bigint;
    sell_order_id: bigint;
    completed: boolean | null;
}

export function storePair(src: Pair) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.pair_id, 32);
        b_0.storeUint(src.buy_order_id, 32);
        b_0.storeUint(src.sell_order_id, 32);
        if (src.completed !== null && src.completed !== undefined) { b_0.storeBit(true).storeBit(src.completed); } else { b_0.storeBit(false); }
    };
}

export function loadPair(slice: Slice) {
    const sc_0 = slice;
    const _pair_id = sc_0.loadUintBig(32);
    const _buy_order_id = sc_0.loadUintBig(32);
    const _sell_order_id = sc_0.loadUintBig(32);
    const _completed = sc_0.loadBit() ? sc_0.loadBit() : null;
    return { $$type: 'Pair' as const, pair_id: _pair_id, buy_order_id: _buy_order_id, sell_order_id: _sell_order_id, completed: _completed };
}

function loadTuplePair(source: TupleReader) {
    const _pair_id = source.readBigNumber();
    const _buy_order_id = source.readBigNumber();
    const _sell_order_id = source.readBigNumber();
    const _completed = source.readBooleanOpt();
    return { $$type: 'Pair' as const, pair_id: _pair_id, buy_order_id: _buy_order_id, sell_order_id: _sell_order_id, completed: _completed };
}

function loadGetterTuplePair(source: TupleReader) {
    const _pair_id = source.readBigNumber();
    const _buy_order_id = source.readBigNumber();
    const _sell_order_id = source.readBigNumber();
    const _completed = source.readBooleanOpt();
    return { $$type: 'Pair' as const, pair_id: _pair_id, buy_order_id: _buy_order_id, sell_order_id: _sell_order_id, completed: _completed };
}

function storeTuplePair(source: Pair) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.pair_id);
    builder.writeNumber(source.buy_order_id);
    builder.writeNumber(source.sell_order_id);
    builder.writeBoolean(source.completed);
    return builder.build();
}

function dictValueParserPair(): DictionaryValue<Pair> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePair(src)).endCell());
        },
        parse: (src) => {
            return loadPair(src.loadRef().beginParse());
        }
    }
}

export type MatchEvent = {
    $$type: 'MatchEvent';
    pair: Pair;
}

export function storeMatchEvent(src: MatchEvent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3943388777, 32);
        b_0.store(storePair(src.pair));
    };
}

export function loadMatchEvent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3943388777) { throw Error('Invalid prefix'); }
    const _pair = loadPair(sc_0);
    return { $$type: 'MatchEvent' as const, pair: _pair };
}

function loadTupleMatchEvent(source: TupleReader) {
    const _pair = loadTuplePair(source);
    return { $$type: 'MatchEvent' as const, pair: _pair };
}

function loadGetterTupleMatchEvent(source: TupleReader) {
    const _pair = loadGetterTuplePair(source);
    return { $$type: 'MatchEvent' as const, pair: _pair };
}

function storeTupleMatchEvent(source: MatchEvent) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTuplePair(source.pair));
    return builder.build();
}

function dictValueParserMatchEvent(): DictionaryValue<MatchEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMatchEvent(src)).endCell());
        },
        parse: (src) => {
            return loadMatchEvent(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2496427056, 32);
        b_0.storeUint(src.amount, 64);
    };
}

export function loadWithdraw(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2496427056) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadUintBig(64);
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadGetterTupleWithdraw(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type ChangeOrderCount = {
    $$type: 'ChangeOrderCount';
    new_max_count: bigint;
}

export function storeChangeOrderCount(src: ChangeOrderCount) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(753540692, 32);
        b_0.storeUint(src.new_max_count, 32);
    };
}

export function loadChangeOrderCount(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 753540692) { throw Error('Invalid prefix'); }
    const _new_max_count = sc_0.loadUintBig(32);
    return { $$type: 'ChangeOrderCount' as const, new_max_count: _new_max_count };
}

function loadTupleChangeOrderCount(source: TupleReader) {
    const _new_max_count = source.readBigNumber();
    return { $$type: 'ChangeOrderCount' as const, new_max_count: _new_max_count };
}

function loadGetterTupleChangeOrderCount(source: TupleReader) {
    const _new_max_count = source.readBigNumber();
    return { $$type: 'ChangeOrderCount' as const, new_max_count: _new_max_count };
}

function storeTupleChangeOrderCount(source: ChangeOrderCount) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.new_max_count);
    return builder.build();
}

function dictValueParserChangeOrderCount(): DictionaryValue<ChangeOrderCount> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOrderCount(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOrderCount(src.loadRef().beginParse());
        }
    }
}

export type CompletePair = {
    $$type: 'CompletePair';
    pair_id: bigint;
}

export function storeCompletePair(src: CompletePair) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1330076981, 32);
        b_0.storeUint(src.pair_id, 32);
    };
}

export function loadCompletePair(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1330076981) { throw Error('Invalid prefix'); }
    const _pair_id = sc_0.loadUintBig(32);
    return { $$type: 'CompletePair' as const, pair_id: _pair_id };
}

function loadTupleCompletePair(source: TupleReader) {
    const _pair_id = source.readBigNumber();
    return { $$type: 'CompletePair' as const, pair_id: _pair_id };
}

function loadGetterTupleCompletePair(source: TupleReader) {
    const _pair_id = source.readBigNumber();
    return { $$type: 'CompletePair' as const, pair_id: _pair_id };
}

function storeTupleCompletePair(source: CompletePair) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.pair_id);
    return builder.build();
}

function dictValueParserCompletePair(): DictionaryValue<CompletePair> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompletePair(src)).endCell());
        },
        parse: (src) => {
            return loadCompletePair(src.loadRef().beginParse());
        }
    }
}

export type Main$Data = {
    $$type: 'Main$Data';
    min_ton_for_storage: bigint;
    max_orders_count: bigint;
    owner: Address;
    order_list: Dictionary<bigint, Order>;
    pairs: Dictionary<bigint, Pair>;
    pair_id: bigint;
    order_count: bigint;
}

export function storeMain$Data(src: Main$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.min_ton_for_storage, 257);
        b_0.storeInt(src.max_orders_count, 257);
        b_0.storeAddress(src.owner);
        b_0.storeDict(src.order_list, Dictionary.Keys.BigInt(257), dictValueParserOrder());
        b_0.storeDict(src.pairs, Dictionary.Keys.BigInt(257), dictValueParserPair());
        b_0.storeUint(src.pair_id, 64);
        b_0.storeUint(src.order_count, 64);
    };
}

export function loadMain$Data(slice: Slice) {
    const sc_0 = slice;
    const _min_ton_for_storage = sc_0.loadIntBig(257);
    const _max_orders_count = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    const _order_list = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserOrder(), sc_0);
    const _pairs = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPair(), sc_0);
    const _pair_id = sc_0.loadUintBig(64);
    const _order_count = sc_0.loadUintBig(64);
    return { $$type: 'Main$Data' as const, min_ton_for_storage: _min_ton_for_storage, max_orders_count: _max_orders_count, owner: _owner, order_list: _order_list, pairs: _pairs, pair_id: _pair_id, order_count: _order_count };
}

function loadTupleMain$Data(source: TupleReader) {
    const _min_ton_for_storage = source.readBigNumber();
    const _max_orders_count = source.readBigNumber();
    const _owner = source.readAddress();
    const _order_list = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserOrder(), source.readCellOpt());
    const _pairs = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPair(), source.readCellOpt());
    const _pair_id = source.readBigNumber();
    const _order_count = source.readBigNumber();
    return { $$type: 'Main$Data' as const, min_ton_for_storage: _min_ton_for_storage, max_orders_count: _max_orders_count, owner: _owner, order_list: _order_list, pairs: _pairs, pair_id: _pair_id, order_count: _order_count };
}

function loadGetterTupleMain$Data(source: TupleReader) {
    const _min_ton_for_storage = source.readBigNumber();
    const _max_orders_count = source.readBigNumber();
    const _owner = source.readAddress();
    const _order_list = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserOrder(), source.readCellOpt());
    const _pairs = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPair(), source.readCellOpt());
    const _pair_id = source.readBigNumber();
    const _order_count = source.readBigNumber();
    return { $$type: 'Main$Data' as const, min_ton_for_storage: _min_ton_for_storage, max_orders_count: _max_orders_count, owner: _owner, order_list: _order_list, pairs: _pairs, pair_id: _pair_id, order_count: _order_count };
}

function storeTupleMain$Data(source: Main$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.min_ton_for_storage);
    builder.writeNumber(source.max_orders_count);
    builder.writeAddress(source.owner);
    builder.writeCell(source.order_list.size > 0 ? beginCell().storeDictDirect(source.order_list, Dictionary.Keys.BigInt(257), dictValueParserOrder()).endCell() : null);
    builder.writeCell(source.pairs.size > 0 ? beginCell().storeDictDirect(source.pairs, Dictionary.Keys.BigInt(257), dictValueParserPair()).endCell() : null);
    builder.writeNumber(source.pair_id);
    builder.writeNumber(source.order_count);
    return builder.build();
}

function dictValueParserMain$Data(): DictionaryValue<Main$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMain$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMain$Data(src.loadRef().beginParse());
        }
    }
}

 type Main_init_args = {
    $$type: 'Main_init_args';
    owner: Address;
}

function initMain_init_args(src: Main_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function Main_init(owner: Address) {
    const __code = Cell.fromHex('b5ee9c7241022b01000c93000228ff008e88f4a413f4bcf2c80bed5320e303ed43d90110020271020d0201200307020120040601afb4293da89a1a400031c31020203ae01020203ae01f481e809e809a67fa67eaac0d82f1c2df4800203a2dadae0410424a817c8000b024e200aaa43c4aa0db678d8e240dd2460db3240dde5a100de48de09c440dd2460dbbd005005a810101240259f40d6fa192306ddf206e92306d8e17d0d31fd31fd31fd2000192d200926d01e255306c146f04e201afb7d33da89a1a400031c31020203ae01020203ae01f481e809e809a67fa67eaac0d82f1c2df4800203a2dadae0410424a817c8000b024e200aaa43c4aa0db678d8e240dd2460db3240dde5a100de52de13c440dd2460dbbd014020120080a017fb4a3bda89a1a400031c31020203ae01020203ae01f481e809e809a67fa67eaac0d82f1c2df4800203a2dadae0410424a817c8000b024e200aaa43c5b678d8e30090002240183b6007da89a1a400031c31020203ae01020203ae01f481e809e809a67fa67eaac0d82f1c2df4800203a2dadae0410424a817c8000b024e200aaa43c4aa4db678d8e300b01f26d7128810101f4856fa520911295316d326d01e2908edd206e92306d8e21d0d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55806c196f09e2206ef2d0806f29531eba93530dba9170e293533cba9170e2925f09e30d8101012a0259f4786fa5209402d4305895316d326d01e2e810365f060c008a557081010109c855805089cb1f16cb3f5004cf1612cb1fcb1fca00216eb3967f01ca00ca00947032ca00e2cb1fcb1fc923103501206e953059f45a30944133f415e201a458017fbcb6076a268690000c70c408080eb80408080eb807d207a027a02699fe99faab0360bc70b7d200080e8b6b6b81041092a05f20002c0938802aa90f16d9e3638c0e0198f8276f107920c101f2d08620c24df2d086c85921c1009758cf84b658a358de712192a70ae412a90c50338e139a7aa90ca630541220c000e63068a592cb07e4da215820c0009230318ae2c9d00f007a700196207aa908c000967aa90401a401e88e18c8019a7aa90ca630541220c000e63068a520599312cb07e4da1259a013a101cf84ba0193cf84c2e4cf1303f23001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e18810101d700810101d700fa40f404f404d33fd33f55606c178e16fa400101d16d6d70208212540be40005812710055521e208925f08e07027d74920c21f953107d31f08de21821094cc7430bae302218210b0128d23bae3022111121f01d65b06d33f0131816d11f8425250c705f2f4f8276f10f8416f24135f03a126a1b6088200d55721c200f2f47f24028042036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00104655132804d45b06d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55803981466656102eb9f2f454776554776554776e0f11160f0e11150e0d11140d0c11130c0b11120b0a11170a09111809db3ca41078107d106c105b104a10394ecd1f10be10ad109c109adb3c881315272201d0105f104e103d4cba820086e851a9db3c6e1bf2f481010129081079060511110504111004103f4edcc855805089cb1f16cb3f5004cf1612cb1fcb1fca00216eb3967f01ca00ca00947032ca00e2cb1fcb1fc910384550206e953059f45a30944133f415e24650443314006e810101250259f40d6fa192306ddf206e92306d8e21d0d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55806c196f09e202503235356d70530b810101f4856fa520911295316d326d01e2908ae85f036c333302c200925f03e30d161902de206e92306d8e21d0d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55806c196f09e2206ef2d0806f29535fba94215612ba9170e294205611ba9170e2995354a856105610a8ba9170e293533dbd9170e29a2270216e925b7091bae29170e2925f09e30d8101012e0217180090557081010109c855805089cb1f16cb3f5004cf1612cb1fcb1fca00216eb3967f01ca00ca00947032ca00e2cb1fcb1fc923103601206e953059f45a30944133f415e201a402a44003002459f4786fa5209402d4305895316d326d01e201fe816224228101017059f40d6fa192306ddf206e92306d8e21d0d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55806c196f09e26eb3f2f4218101017059f40d6fa192306ddf206e92306d8e21d0d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55806c196f09e2206ef2d0806f295f07231a03fe810101f4856fa520911295316d326d01e2908e52206e92306d8e21d0d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55806c196f09e2206ef2d0806f295f075303b9923333915be2810101250259f4786fa5209402d4305895316d326d01e2e85f03321069105810471039487927db3c28db3c09921067df1b1b1d01ea814856258101012359f40d6fa192306ddf206e92306d8e21d0d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55806c196f09e26eb3f2f4248101012259f40d6fa192306ddf206e92306d8e21d0d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55806c196f09e21c00a0206ef2d0806f29321716151443307f0181010109c855805089cb1f16cb3f5004cf1612cb1fcb1fca00216eb3967f01ca00ca00947032ca00e2cb1fcb1fc9103612206e953059f45a30944133f415e20301fea4542017187081010154743224c855305034cb1fcb1fcb1f216eb3967f01ca00ca00947032ca00e2c925103b01206e953059f45a30944133f415e208c855308210eb0b56695005cb1f045034cb1fcb1fcb1f216eb3967f01ca00ca00947032ca00e2c9c88258c000000000000000000000000101cb67ccc970fb00103655221e00021204be8210a81dbc5dbae3022182102cea1e54ba8f435b3405d31f0131816d11f8425240c705f2f48810571610354430f842017f6ddb3cc87f01ca0055605067810101cf0014810101cf0058cf16f400f400cb3fcb3fc9ed54e02182104f475d35ba2027292301f65b06d31f0131814856238101012359f40d6fa192306ddf206e92306d8e21d0d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55806c196f09e26eb3f2f4228101012259f40d6fa192306ddf206e92306d8e21d0d31fd33ffa40d31fd31fd200d2000192d200926d01e2d31fd31f55806c196f09e22102f6206ef2d0806f2910685f08812d4cf8425260c70592317f95f84212c705e2f2f48101016d206e92306d8e31206ef2d0806f29c855805089cb1f16cb3f5004cf1612cb1fcb1fca00216eb3967f01ca00ca00947032ca00e2cb1fcb1fc9e2103412206e953059f45a30944133f415e206a5881057104610351034102327220152f842017f6ddb3cc87f01ca0055605067810101cf0014810101cf0058cf16f400f400cb3fcb3fc9ed542903c2e302218210946a98b6ba8ec55b06d33f0131c8018210aff90f5758cb1fcb3fc91057104610354430f84201706ddb3cc87f01ca0055605067810101cf0014810101cf0058cf16f400f400cb3fcb3fc9ed54e038c00007c12117b0e3025f07f2c08224292a01fc5b06d31f0131817c40f8425250c705f2f4814bb5228101012359f40d6fa192306ddf206e92306d8e17d0d31fd31fd31fd2000192d200926d01e255306c146f04e26eb3f2f4218101012259f40d6fa192306ddf206e92306d8e17d0d31fd31fd31fd2000192d200926d01e255306c146f04e2206ef2d0806f24307f5433212501e681010106c855305034cb1fcb1fcb1f216eb3967f01ca00ca00947032ca00e2c910354540206e953059f45a30944133f415e28101016d206e92306d8e31206ef2d0806f29c855805089cb1f16cb3f5004cf1612cb1fcb1fca00216eb3967f01ca00ca00947032ca00e2cb1fcb1fc9e2103541502603d8206e953059f45a30944133f415e28101016d206e92306d8e31206ef2d0806f29c855805089cb1f16cb3f5004cf1612cb1fcb1fca00216eb3967f01ca00ca00947032ca00e2cb1fcb1fc9e24130206e953059f45a30944133f415e288105710461035444013f842017f6ddb3c272928002a00000000526566756e6420676173206578636573730044c87f01ca0055605067810101cf0014810101cf0058cf16f400f400cb3fcb3fc9ed5400a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00004c10465513c87f01ca0055605067810101cf0014810101cf0058cf16f400f400cb3fcb3fc9ed54f0a39f3a');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initMain_init_args({ $$type: 'Main_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const Main_errors = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough Toncoin` },
    38: { message: `Not enough extra currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid standard address` },
    138: { message: `Not a basechain address` },
    11596: { message: `Only owner or order creator is allowed to remove` },
    18022: { message: `Max order limit is exceeded` },
    18518: { message: `Order not found` },
    19381: { message: `Pair with such id not exist` },
    25124: { message: `First element is missing` },
    27921: { message: `Only owner is allowed to withdraw` },
    31808: { message: `Only owner is allowed to complete` },
    34536: { message: `Order already exist` },
    54615: { message: `Insufficient balance` },
} as const

export const Main_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Only owner or order creator is allowed to remove": 11596,
    "Max order limit is exceeded": 18022,
    "Order not found": 18518,
    "Pair with such id not exist": 19381,
    "First element is missing": 25124,
    "Only owner is allowed to withdraw": 27921,
    "Only owner is allowed to complete": 31808,
    "Order already exist": 34536,
    "Insufficient balance": 54615,
} as const

const Main_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Order","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user_id","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"is_buy","type":{"kind":"simple","type":"bool","optional":false}},{"name":"is_paired","type":{"kind":"simple","type":"bool","optional":true}},{"name":"base_token","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"quote_token","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateOrder","header":2954005795,"fields":[{"name":"order","type":{"kind":"simple","type":"Order","optional":false}}]},
    {"name":"RemoveOrder","header":2820521053,"fields":[{"name":"order_id","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Pair","header":null,"fields":[{"name":"pair_id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"buy_order_id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"sell_order_id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"completed","type":{"kind":"simple","type":"bool","optional":true}}]},
    {"name":"MatchEvent","header":3943388777,"fields":[{"name":"pair","type":{"kind":"simple","type":"Pair","optional":false}}]},
    {"name":"Withdraw","header":2496427056,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ChangeOrderCount","header":753540692,"fields":[{"name":"new_max_count","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompletePair","header":1330076981,"fields":[{"name":"pair_id","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Main$Data","header":null,"fields":[{"name":"min_ton_for_storage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"max_orders_count","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"order_list","type":{"kind":"dict","key":"int","value":"Order","valueFormat":"ref"}},{"name":"pairs","type":{"kind":"dict","key":"int","value":"Pair","valueFormat":"ref"}},{"name":"pair_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"order_count","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
]

const Main_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "CreateOrder": 2954005795,
    "RemoveOrder": 2820521053,
    "MatchEvent": 3943388777,
    "Withdraw": 2496427056,
    "ChangeOrderCount": 753540692,
    "CompletePair": 1330076981,
}

const Main_getters: ABIGetter[] = [
    {"name":"list","methodId":94211,"arguments":[{"name":"base_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"quote_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"is_buy","type":{"kind":"simple","type":"bool","optional":false}}],"returnType":{"kind":"dict","key":"int","value":"Order","valueFormat":"ref"}},
    {"name":"pair","methodId":65865,"arguments":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Pair","optional":true}},
    {"name":"order","methodId":81561,"arguments":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Order","optional":true}},
    {"name":"balance","methodId":104128,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const Main_getterMapping: { [key: string]: string } = {
    'list': 'getList',
    'pair': 'getPair',
    'order': 'getOrder',
    'balance': 'getBalance',
    'owner': 'getOwner',
}

const Main_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOrderCount"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CompletePair"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class Main implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = Main_errors_backward;
    public static readonly opcodes = Main_opcodes;
    
    static async init(owner: Address) {
        return await Main_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const __gen_init = await Main_init(owner);
        const address = contractAddress(0, __gen_init);
        return new Main(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new Main(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Main_types,
        getters: Main_getters,
        receivers: Main_receivers,
        errors: Main_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Withdraw | CreateOrder | RemoveOrder | ChangeOrderCount | CompletePair | null | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateOrder') {
            body = beginCell().store(storeCreateOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveOrder') {
            body = beginCell().store(storeRemoveOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOrderCount') {
            body = beginCell().store(storeChangeOrderCount(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CompletePair') {
            body = beginCell().store(storeCompletePair(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getList(provider: ContractProvider, base_token: bigint, quote_token: bigint, is_buy: boolean) {
        const builder = new TupleBuilder();
        builder.writeNumber(base_token);
        builder.writeNumber(quote_token);
        builder.writeBoolean(is_buy);
        const source = (await provider.get('list', builder.build())).stack;
        const result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserOrder(), source.readCellOpt());
        return result;
    }
    
    async getPair(provider: ContractProvider, id: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(id);
        const source = (await provider.get('pair', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTuplePair(result_p) : null;
        return result;
    }
    
    async getOrder(provider: ContractProvider, id: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(id);
        const source = (await provider.get('order', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleOrder(result_p) : null;
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('balance', builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}
/**
 * Copyright (c) 2024 Hemi Labs, Inc.
 * Use of this source code is governed by the MIT License,
 * which can be found in the LICENSE file.
 */

import * as types from '../types';
import type {
  BitcoinBalanceResult,
  BitcoinInfoResult,
  BitcoinUTXOsResult,
  GenerateKeyResult,
  L2KeystonesResult,
  PingResult,
  VersionResult,
} from '../types';
import { init, close, dispatch, type DispatchArgs } from './wasm';

export type * from '../types';
export { init, close };

const dispatchVoid = async (args: DispatchArgs) => {
  await dispatch(args);
};

export const version: typeof types.version = () => {
  return dispatch({ method: 'version' }) as Promise<VersionResult>;
};

export const generateKey: typeof types.generateKey = ({ network }) => {
  return dispatch({
    method: 'generateKey',
    network: network,
  }) as Promise<GenerateKeyResult>;
};

export const startPoPMiner: typeof types.startPoPMiner = (args) => {
  return dispatchVoid({
    method: 'startPoPMiner',
    network: args.network,
    privateKey: args.privateKey,
    logLevel: args.logLevel ?? '',
    staticFee: args.staticFee,
  });
};

export const stopPoPMiner: typeof types.stopPoPMiner = () => {
  return dispatchVoid({
    method: 'stopPoPMiner',
  });
};

export const ping: typeof types.ping = () => {
  return dispatch({
    method: 'ping',
  }) as Promise<PingResult>;
};

export const l2Keystones: typeof types.l2Keystones = ({ numL2Keystones }) => {
  return dispatch({
    method: 'l2Keystones',
    numL2Keystones: numL2Keystones,
  }) as Promise<L2KeystonesResult>;
};

export const bitcoinBalance: typeof types.bitcoinBalance = ({ scriptHash }) => {
  return dispatch({
    method: 'bitcoinBalance',
    scriptHash: scriptHash,
  }) as Promise<BitcoinBalanceResult>;
};

export const bitcoinInfo: typeof types.bitcoinInfo = () => {
  return dispatch({
    method: 'bitcoinInfo',
  }) as Promise<BitcoinInfoResult>;
};

export const bitcoinUTXOs: typeof types.bitcoinUTXOs = ({ scriptHash }) => {
  return dispatch({
    method: 'bitcoinUTXOs',
    scriptHash: scriptHash,
  }) as Promise<BitcoinUTXOsResult>;
};

import { Options, PageInfo } from './types';

export const enum MessageTypes {
  GET_BRANCH_NAME_REQUEST = 'GET_BRANCH_NAME_REQUEST',
  GET_BRANCH_NAME_RESPONSE = 'GET_BRANCH_NAME_RESPONSE',
  GET_PAGE_INFO_REQUEST = 'GET_PAGE_INFO_REQUEST',
  GET_PAGE_INFO_RESPONSE = 'GET_PAGE_INFO_RESPONSE',
  GET_OPTIONS_REQUEST = 'GET_OPTIONS_REQUEST',
  GET_OPTIONS_RESPONSE = 'GET_OPTIONS_RESPONSE',
  UPDATE_OPTION_REQUEST = 'UPDATE_OPTION_REQUEST',
  UPDATE_OPTION_RESPONSE = 'UPDATE_OPTION_RESPONSE',
}
interface Message {
  type: string;
}
export interface GetBranchNameRequest extends Message {}

export interface GetBranchNameResponse extends Message {
  branchName: string;
}

export interface GetPageInfoRequest extends Message {
  type: string;
}

export interface GetPageInfoResponse extends Message {
  pageInfo: PageInfo;
}

export interface GetOptionsRequest extends Message {}

export interface GetOptionsResponse extends Message {
  options: Options;
}

export interface UpdateOptionRequest extends Message {
  options: Partial<Options>;
}

export interface UpdateOptionResponse extends Message {
  result: 'ok' | 'ko';
}

export type MessageType =
  GetBranchNameRequest |
  GetBranchNameResponse |
  GetPageInfoRequest |
  GetPageInfoResponse |
  GetOptionsRequest |
  GetOptionsResponse;

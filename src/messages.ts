export const enum MessageTypes {
  GET_BRANCH_NAME_REQUEST = "GET_BRANCH_NAME_REQUEST",
  GET_BRANCH_NAME_RESPONSE = "GET_BRANCH_NAME_RESPONSE",
  GET_PAGE_INFO_REQUEST = "GET_PAGE_INFO_REQUEST",
  GET_PAGE_INFO_RESPONSE = "GET_PAGE_INFO_RESPONSE",
}

export interface GetBranchNameRequest {
  type: string;
}

export interface GetBranchNameResponse {
  type: string;
  branchName: string;
}

export interface GetPageInfoRequest {
  type: string;
}

export interface GetPageInfoResponse {
  type: string;
  pageInfo: PageInfo;
}

export type PageInfo = {
  issueType: string;
  issueName: string;
  issueDescription: string;
}


export type MessageType = 
  GetBranchNameRequest | 
  GetBranchNameResponse | 
  GetPageInfoRequest |
  GetPageInfoResponse;

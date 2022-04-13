export type PageInfo = {
  issueType: string;
  issueName: string;
  issueDescription: string;
}

export type Options = {
  addGitCommand?: boolean;
  maxBranchLength?: number;
  enableConventionalPrefix?: boolean;
  customPrefixes?: string;
}

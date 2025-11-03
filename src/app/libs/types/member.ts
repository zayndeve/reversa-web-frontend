import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
  [x: string]: unknown;
  _id: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberEmail?: string;
  memberImage?: string;
  memberPoints?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
  memberEmail?: string;
}
export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}
export interface MemberUpdateInput {
  _id: string;
  memberStatus?: MemberStatus;
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberEmail?: string;
}

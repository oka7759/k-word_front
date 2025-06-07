export interface LoginResp {
  userId: number;
  accessToken: string;
}

export interface NoticeListResp {
  id?: number;
  title: string;
  content: string;
  language: string;
  imageUrl: string | null;
  startAt: string;
  expiredAt: string;
}

export interface SellerResp {
  id: string;
  name: string;
  code: string;
  country: string;
}

interface Member {
  id: number;
  name: string;
  email: string;
  joinDate: string;
}

export type MemberResp = Member[];

export interface DashBoardResp {
  totalMembers: number;
  totalPays: number;
}

export interface PaymentDTO {
  id: number;
  os: string;
  productName: string;
  username: string;
  sellerCountry: string | null;
  sellerName: string | null;
  sellerCode: string | null;
  createdAt: string;
}

export interface SellerPayDTO {
  id: number;
  name: string;
  code: string;
  country: string;
  countMonthly: number;
  countQuarterly: number;
}

export interface PaymentResp {
  payList: PaymentDTO[];
  sellerList: SellerPayDTO[];
}

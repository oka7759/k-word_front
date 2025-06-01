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

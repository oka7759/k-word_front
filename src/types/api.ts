export interface LoginResp {
  userId: number;
  accessToken: string;
}

export interface NoticeListResp {
  id: number;
  title: string;
  content: string;
  language: string;
  imageUrl: string | null;
}

export interface SellerResp {
  id: string;
  name: string;
  code: string;
}

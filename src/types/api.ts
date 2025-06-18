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

export interface ContestResp {
  categoryCount: number;
  deckCount: number;
  cardCount: number;
}

export interface UpdateContents {
  excelData: ExcelRow[];
  category: string;
  deck: string;
  language: {
    a: string | null;
    b: string | null;
    c: string | null;
    d: string | null;
  };
}

export interface ExcelRow {
  category: string;
  deck: string;
  card: string;
  target: string;
  face1: string;
  face2: string;
  face3: string;
  face4: string;
}

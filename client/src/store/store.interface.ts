import type { IAuthUser } from "../modules/auth/interfaces/auth.interface";
import type { IBuyerDocument } from "../modules/buyer/interfaces/buyer.interface";
import type { ISellerDocument } from "../modules/sellers/interfaces/seller.interface";
import type { INotification } from "../shared/header/interfaces/header.interface";

export interface IReduxState {
  authUser: IAuthUser;
  header: string;
  logout: boolean;
  buyer: IBuyerDocument;
  seller: ISellerDocument;
  showCategoryContainer: boolean;
  notification: INotification;
}
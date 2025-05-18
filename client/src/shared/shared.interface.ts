import { type SerializedError } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  type ChangeEvent,
  type CSSProperties,
  type Dispatch,
  type KeyboardEvent,
  type MouseEventHandler,
  type ReactNode,
  type SetStateAction,
} from 'react';
import type {
  IAuthDocument,
  IAuthResponse,
  IResetPassword,
  ISignInPayload,
  ISignUpPayload,
} from '../modules/auth/interfaces/auth.interface';
import type { IBuyerDocument } from '../modules/buyer/interfaces/buyer.interface';
import type {
  IConversationDocument,
  IMessageDocument,
} from '../modules/chat/interfaces/chat.interface';
import type {
  ICreateGig,
  ISellerGig,
} from '../modules/gigs/interfaces/gig.interface';
import type {
  IOrderDocument,
  IOrderNotification,
} from '../modules/order/interfaces/order.interface';
import type { IReviewDocument } from '../modules/order/interfaces/review.interface';
import type {
  IEducation,
  IExperience,
  ILanguage,
  IPersonalInfoData,
  ISellerDocument,
} from '../modules/sellers/interfaces/seller.interface';

export type validationErrorsType =
  | ISignInPayload
  | ISignUpPayload
  | IResetPassword
  | ICreateGig
  | IPersonalInfoData
  | IExperience
  | IEducation
  | ILanguage;

export interface IQueryResponse {
  data: IAuthResponse;
  error: FetchBaseQueryError | SerializedError;
}

export interface IResponse {
  message?: string;
  token?: string;
  user?: IAuthDocument;
  buyer?: IBuyerDocument;
  seller?: ISellerDocument;
  sellers?: ISellerDocument[];
  gig?: ISellerGig;
  gigs?: ISellerGig[];
  total?: number;
  sortItems?: string[];
  conversations?: IConversationDocument[] | IMessageDocument[];
  messages?: IMessageDocument[];
  messageData?: IMessageDocument;
  conversationId?: string;
  clientSecret?: string;
  paymentIntentId?: string;
  order?: IOrderDocument;
  orders?: IOrderDocument[];
  review?: IReviewDocument;
  reviews?: IReviewDocument[];
  notifications?: IOrderNotification[];
  browserName?: string;
  deviceType?: string;
}

export interface IBannerProps {
  bgColor: string;
  text: string;
  showLink: boolean;
  linkText?: string;
  onClick?: () => void;
}

export interface IAlertProps {
  type: string;
  message: string;
}

export interface IAlertTypes {
  [key: string]: string;
  success: string;
  error: string;
  warning: string;
}

export interface IBreadCrumbProps {
  breadCrumbItems: string[];
}

export interface IDropdownProps {
  text: string;
  values: string[];
  maxHeight: string;
  mainClassNames?: string;
  dropdownClassNames?: string;
  showSearchInput?: boolean;
  style?: CSSProperties;
  setValue?: Dispatch<SetStateAction<string>>;
  onClick?: (item: string) => void;
}

export interface IHtmlParserProps {
  input: string;
}

export interface IPageMessageProps {
  header: string;
  body: string;
}

export interface ITextInputProps {
  id?: string;
  name?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  readOnly?: boolean;
  checked?: boolean;
  rows?: number;
  autoFocus?: boolean;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  onChange?: (event: ChangeEvent) => void;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyUp?: () => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export interface IButtonProps {
  label?: string | ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  id?: string;
  className?: string;
  role?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  testId?: string;
}

export interface ISliderImagesText {
  header: string;
  subHeader: string;
}

export interface IStarRatingProps {
  value?: number;
  size?: number;
  setReviewRating?: Dispatch<SetStateAction<number>>;
}

export interface IGigCardItemModal {
  overlay: boolean;
  deleteApproval: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  msg: string;
}

export type ResponseApi<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PopulatedParticipant {
  _id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface PopulatedConversation {
  _id: string;
  type: "direct" | "group";
  name?: string;
  avatar?: string;
  participants: PopulatedParticipant[];
  lastMessage?: string;
  createdAt: string;
  updatedAt: string;
}
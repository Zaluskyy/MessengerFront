export interface IConversation {
    id: number;
    receiverId: number;
    senderId: number;
    receiverName: string;
    senderName: string;
    text: string;
    time: Date;
  }

  export interface IUser {
    id: number,
    name: string
  }

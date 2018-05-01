export class Post {

  postId: number;
  comment: string;
  timeCreated: string;
  timeUpdated: string;
  eventId: number;


  constructor(comment: string, eventId: number) {
    this.comment = comment;
    this.eventId = eventId;
  }

}

export interface Post {
}

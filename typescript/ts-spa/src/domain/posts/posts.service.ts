import { ServiceDomain } from "../utilities/service-domain";
import { getPosts, getUsers } from "../../pseudo-backend";
import { Repository } from "../../repository";
import Post from "./types/post";
import { CommentsService } from "../comments/comments.service";
export class Posts implements ServiceDomain {
  cacheName: string = "posts";
  posts: Array<Post> = [];
  comments?: CommentsService;
  _repository: Repository;

  constructor() {
    console.log("Post constructor");
    this._repository = Repository.getInstance();
  }
  init(): void {
    throw new Error("Method not implemented.");
  }

  getDefaultHtml(): string {
    throw new Error("Method not implemented.");
  }

  async getData(request: Promise<any>):  Promise<Array<Post> | void> {
    await request
      .then((apiResponse) => {
        this.posts = apiResponse.data;
        this._repository.persistData(this.cacheName, apiResponse.data);
        return this.posts;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async returnPostsByAuthorId(authorId: number): Promise<Post[]> {
    await this.getData(getPosts());
    return this.posts.filter((post: Post) => post.user_id === authorId);
  }

  async getCommentsByPostId(postId: number): Promise<any> {
    this.comments = new CommentsService();
    return this.comments.returnCommentsByPostId(postId);
  }

}

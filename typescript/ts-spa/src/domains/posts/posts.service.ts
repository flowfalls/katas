import { ServiceDomain } from "../utilities/service-domain";
import { getPosts, getUsers } from "../../pseudo-backend";
import { Repository } from "../../repository";
import Post from "./types/post";
export class Posts implements ServiceDomain {
  cacheName: string = "posts";
  posts: Array<Post> = [];

  _repository: Repository;

  constructor() {
    console.log("Post constructor");
    this._repository = Repository.getInstance();
  }

  getHtml(): string {
    throw new Error("Method not implemented.");
  }

  async getData(request: Promise<any>): Promise<void> {
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

  async returnAuthorPosts(authorId: number): Promise<Post[]> {
    await this.getData(getPosts());
    return this.posts.filter((post: Post) => post.user_id === authorId);
  }
}

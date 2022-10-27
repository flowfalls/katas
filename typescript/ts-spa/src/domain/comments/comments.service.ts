import { ServiceDomain } from "../utilities/service-domain";
import { getComments } from "../../pseudo-backend";
import Comment from "./types/comment";
import { Repository } from "../../repository";
import { AuthorsService } from "../authors/authors.service";
import { replaceContent } from "../utilities/replace-content";
export class CommentsService implements ServiceDomain {
  cacheName: string = "comments";
  comments: Array<Comment> = [];
  _authorsService?: AuthorsService;

  _repository: Repository;

  constructor() {
    console.log("Comments constructor");
    this._repository = Repository.getInstance(); // singleton access
  }

  async init(): Promise<void> {
    this._authorsService = new AuthorsService();
    await this._authorsService.init(); // trigger the insertion of html

  }

  async getData(request: Promise<any>): Promise<Array<Comment> | void> {

    return await request
    .then((apiResponse) => {
      this.comments = apiResponse.data;
      this._repository.persistData(this.cacheName, apiResponse.data);
      return this.comments ?? [];
    })
    .catch((error) => {
      console.log(error);
    });
  }

  storeData(key: string, value: any): void {
    throw new Error("Method not implemented.");
  }

  getDefaultHtml(): string {
    return `
    <h1>Authors</h1>
    <h2>Select Author To View Posts</h2>
    <div id=authors data-target=comments>Loading <span class="loader"></span></div>
    <div id=author-comments></div>
  `;
  }

  async returnCommentsByPostId(postId: number): Promise<Comment[]> {
    await this.getData(getComments());
    return this.comments.filter((comment: Comment) => comment.post_id === postId);
  }

  async returnCommentsByAuthorId(authorId: number): Promise<Comment[]> {
    await this.getData(getComments());
    return this.comments.filter((comment: Comment) => comment.user_id === authorId);
  }
}

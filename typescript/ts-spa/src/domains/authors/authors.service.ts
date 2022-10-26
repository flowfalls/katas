import { ServiceDomain } from "../utilities/service-domain";
import { getUsers } from "../../pseudo-backend";
import { Repository } from "../../repository";
import Author from "./types/author";
import {replaceContent} from "../utilities/replace-content";
import { Posts } from "../posts/posts.service";
export class Authors implements ServiceDomain {
  cacheName: string = "authors";
  authors: Array<Author> = [];
  posts: Posts;
  _repository: Repository;

  constructor() {
    console.log("Authors constructor");
    this.posts = new Posts();
    this._repository = Repository.getInstance();
    this.getData(getUsers());
  }

  async getData(request: Promise<any>): Promise<void> {
    await request
      .then((apiResponse) => {
        this.authors = apiResponse.data;
        this._repository.persistData(this.cacheName, apiResponse.data);
        replaceContent(this.buildAuthorListHtml(this.authors), "authors");
        const input = document.getElementById('select-authors');
        input?.addEventListener('change', this.selectedAuthor.bind(this));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async selectedAuthor(event: Event) {
    if (event.target) {
      const selection = event.target as HTMLSelectElement;
      await this.buildAuthorPosts(parseInt(selection.value)).then((posts) => {
        console.log('replacing content', posts);
        console.log(replaceContent);
          replaceContent(posts, "author-posts");
      });
    }
  }

  buildAuthorListHtml(authors: Array<Author>): string {
    let html = `<select name="select-authors" id="select-authors">`;
    authors.forEach((author: Author) => {
      html += `<option value="${author.id}">${author.name}</option>`;
    });
    html += `</select>`;

    return html;
  };

  buildAuthorPosts = async (authorId: number): Promise<string> => {
    const authorPosts = await this.posts.returnAuthorPosts(authorId);
    let html = `<div>`;
    authorPosts.forEach((post: any) => {
      html += `<article><h2>${post.title}</h2><p>${post.body}</p></article>`;
    });
    html += `</div>`;
    return html;
  }

  getHtml = () => {
    return `
      <h1>Authors</h1>
      <h2>Select Author To View Posts</h2>
      <div id=authors>Loading <span class="loader"></span></div>
      <div id=author-posts></div>
    `;
  }
}

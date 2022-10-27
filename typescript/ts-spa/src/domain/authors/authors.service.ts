import { ServiceDomain } from "../utilities/service-domain";
import { getUsers } from "../../pseudo-backend";
import { Repository } from "../../repository";
import Author from "./types/author";
import { replaceContent } from "../utilities/replace-content";
import { Posts } from "../posts/posts.service";
import Post from "../posts/types/post";
import Comments from "../comments/types/comment";
import { CommentsService } from "../comments/comments.service";
export class AuthorsService implements ServiceDomain {
  cacheName: string = "authors";
  private _authors: Array<Author> = [];

  selectedAuthorName: string = "";
  posts: Posts;
  private repository: Repository;

  constructor() {
    console.log("Authors constructor");
    this.posts = new Posts();
    this.repository = Repository.getInstance(); // singleton access
  }

  async init() {
    this.authors = await this.getData(getUsers()); // set the authors
    this.insertAuthorListHtml();
  }

  /**
   * Grab the initial data from the psuedo api
   *
   * @param request The psuedo external api request
   */
  async getData(request: Promise<any>): Promise<Array<Author>> {
    return await request
      .then((apiResponse) => {
        this.repository.persistData(this.cacheName, apiResponse.data); // for cache purposes
        return apiResponse.data ?? [];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Handle Author Selected Event from the select list html element
   * @param event
   */
  async eventHandlerAuthorSelected(event: Event) {
    if (event.target) {
      const selection = event.target as HTMLSelectElement;
      const authorName = selection.options[selection.selectedIndex].text;

      if ((selection.parentNode as HTMLElement).dataset.target === "comments") {
        await this.aggregateCommentsByAuthor(
          parseInt(selection.value),
          authorName
        ).then((comments: any) => {
          replaceContent(comments, "author-comments");
        });
      } else {
        // grab all related posts by this author first
        await this.aggregatePostsByAuthor(
          parseInt(selection.value),
          authorName
        ).then((posts) => {
          replaceContent(posts, "author-posts");
          const input: HTMLCollectionOf<Element> =
            document.getElementsByClassName("load-post-comments");
          // iterate over input elements
          for (let i = 0; i < input.length; i++) {
            input[i].addEventListener(
              "click",
              this.eventHandlerLoadPostComments.bind(this)
            );
          }
        });
      }
    }
  }

  async eventHandlerLoadPostComments(event: Event) {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const postId = parseInt(event.target.dataset.postId!);
    // load comments from postId
    await this.posts
      .getCommentsByPostId(postId)
      .then((comments: Array<Comments>) => {
        const html = comments.map((comment: Comments) => {
          return `<blockquote>
        <p>${comment.body}</p>
        <p><cite>– ${
          this.authors.find((author: Author) => author.id === comment.user_id)
            ?.name ?? "unknown"
        }</cite></p>
        </blockquote><br />`;
        });

        replaceContent(html.join(""), `post-comments-${postId}`);
      });
  }

  /**
   * Build a html select list from an array of Author objects
   * @param authors
   * @returns html string
   */
  buildAuthorListHtml(authors: Array<Author>): string {
    let html = `<select name="select-authors" id="select-authors">`;
    authors.forEach((author: Author) => {
      html += `<option value="${author.id}">${author.name}</option>`;
    });
    html += `</select>`;

    return html;
  }

  private insertAuthorListHtml(): void {
    console.log(this.authors);
    replaceContent(this.buildAuthorListHtml(this.authors), "authors");
    const input = document.getElementById("select-authors");
    input?.addEventListener(
      "change",
      this.eventHandlerAuthorSelected.bind(this)
    ); // event listener
  }

  /**
   * Grab Posts by the Author
   * @param authorId the author ID as a number
   * @param name the name of the author
   * @returns
   */
  aggregatePostsByAuthor = async (
    authorId: number,
    name?: string
  ): Promise<string> => {
    const authorPosts: Array<Post> = await this.posts.returnPostsByAuthorId(
      authorId
    );
    let html = `<hr /><div><div><img class="profile-image" src="https://xsgames.co/randomusers/avatar.php?g=${
      Math.floor(Math.random() * 100) > 50 ? "female" : "male"
    }">${name}</div>`;
    authorPosts.forEach((post: Post) => {
      html +=
        `<article><h2>${post.title}</h2><p>${post.body}</p>` +
        `<button class="load-post-comments" data-post-id=${post.id}>View comments</button>` +
        `<div id=post-comments-${post.id}></div>` +
        `</article>`;
    });
    html += `</div>`;
    return html;
  };

   /**
   * Grab Comments by the Author
   * @param authorId the author ID as a number
   * @param name the name of the author
   * @returns
   */
    aggregateCommentsByAuthor = async (
      authorId: number,
      name?: string
    ): Promise<string> => {

      const authorComments: Array<Comments> = await new CommentsService().returnCommentsByAuthorId(
        authorId
      );
      let html = `<hr /><div>`;
      authorComments.forEach((comment: Comments) => {
        html +=
          `<article><h2>${comment.id}</h2><p>${comment.body}</p></article>`;
      });
      html += `</div>`;
      return html;
    };

  public get authors(): Array<Author> {
    return this._authors;
  }

  public set authors(value: Array<Author>) {
    this._authors = value;
  }

  /**
   * Return the default html for the page
   * @returns
   */
  getDefaultHtml = () => {
    return `
      <h1>Authors</h1>
      <h2>Select Author To View Posts</h2>
      <div id=authors data-target=posts>Loading <span class="loader"></span></div>
      <div id=author-posts></div>
    `;
  };
}

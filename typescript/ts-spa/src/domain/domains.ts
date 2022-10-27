import { AuthorsService } from "./authors/authors.service";
import { Posts } from "./posts/posts.service";
import { CommentsService } from "./comments/comments.service";

export const services = [AuthorsService, Posts, CommentsService];

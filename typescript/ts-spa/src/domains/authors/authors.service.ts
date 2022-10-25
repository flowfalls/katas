import { ServiceDomain } from "../utilities/service-domain";
import { getUsers } from "../../pseudo-backend";
import { Repository } from "../../repository";
import Author from "./types/author";
// import EventEmitter from 'eventemitter3';


export class Authors implements ServiceDomain {
  cacheName: string = "authors";
  authors: Array<Author> = [];

  _repository: Repository;
  // _eventEmitter: EventEmitter;

  constructor() {
    console.log("Authors constructor");
    this._repository = Repository.getInstance();
    // this._eventEmitter = new EventEmitter();
    this.getData(getUsers());
  }

  async getData(request: Promise<any>): Promise<void> {
    await request
      .then((apiResponse) => {
        this.authors = apiResponse.data;
        this._repository.persistData(this.cacheName, apiResponse.data);

        console.log("Authors data", this.authors);
        this.getHtml();
        // emit event
        //this._eventEmitter.emit("authors.loaded", this.authors);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getHtml = () => {
    console.log(this.authors);
    return `
      <h1>Authors</h1>
      <ul>
        <span id="authors">${this.authors}</span>
      </ul>
    `;
  }
}

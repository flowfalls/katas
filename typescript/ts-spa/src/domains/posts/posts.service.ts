import { ServiceDomain } from "../utilities/service-domain";

export class Posts implements ServiceDomain {
  getData(request: Promise<any>): void {
    throw new Error("Method not implemented.");
  }
  storeData(key: string, value: any): void {
    throw new Error("Method not implemented.");
  }
  getHtml(): string {
    throw new Error("Method not implemented.");
  }
}

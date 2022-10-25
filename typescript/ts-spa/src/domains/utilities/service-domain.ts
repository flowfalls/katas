export class ServiceDomain {
  getData(request: Promise<any>): void {
    console.log(request);
  }

  getHtml(): string {
    return "";
  }
}


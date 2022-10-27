export class ServiceDomain {
  getData(request: Promise<any>): void {
    console.log(request);
  }

  getDefaultHtml(): string {
    return "";
  }

  init(): void {
  }
}


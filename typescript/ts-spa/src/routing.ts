import { services } from "./domain/domains";
import { ServiceDomain } from "./domain/utilities/service-domain";
import { Repository } from "./repository";

type IndexedServiceDomain = {
  [name: string]: typeof ServiceDomain;
}

export class Router {

  activeService?: typeof ServiceDomain;

  _routeServices: IndexedServiceDomain = {};

  constructor(private readonly services: Array<typeof ServiceDomain>) {
    services.forEach((service: typeof ServiceDomain) => {
      this._routeServices[service.name.toLowerCase()] = service;
    });

    this.init();
  }

  init(): void {
    const element = document.getElementsByClassName("route-nav");
    for (let i = 0; i < element.length; i++) {
      element[i].addEventListener("click", this.onClickTriggered);
    }
  }

  onClickTriggered = (ev: Event) => {
    console.log(this);
    ev.preventDefault();

    if(!ev.target) {
      alert('no target');
    }

    const requestedLink = (ev.target as HTMLElement).getAttribute('href');

    if(!requestedLink) {
      alert('no link'); // 404?
      return;
    }

    this.activeService = this._routeServices[requestedLink.replace('/', '')+'service']; //or substring(1)

    console.log(this.activeService);
    // create a new instance, and call the getDefaultHtml method
    const service = new this.activeService();
    const content = service.getDefaultHtml();
    console.log(content);
    //replace inner html
    const contentElement = document.getElementById("app");
    if(contentElement) {
      contentElement.innerHTML = content;
    }
    service.init();
  }

}

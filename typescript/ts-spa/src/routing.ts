import { services } from "./domains/domains";
import { ServiceDomain } from "./domains/utilities/service-domain";
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

    this.activeService = this._routeServices[requestedLink.replace('/', '')]; //or substring(1)

    // create a new instance, and call the getHtml method
    const content = new this.activeService().getHtml();
    console.log('content', content);
    //replace inner html
    const contentElement = document.getElementById("app");
    if(contentElement) {
      contentElement.innerHTML = content;
    }
  }

}

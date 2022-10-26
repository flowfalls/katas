export function replaceContent(content: string, elementId: string = "app"): void {
  console.log('replace content');
  let contentElement = document.getElementById(elementId);
  console.log(contentElement);
  if(contentElement) {
    console.log('element exist, replacing innerHtml');
    contentElement.innerHTML = content;
  }
}

export function replaceContent(content: string, elementId: string = "app"): void {
  let contentElement = document.getElementById(elementId);
  if(contentElement) {
    contentElement.innerHTML = content;
  }
}

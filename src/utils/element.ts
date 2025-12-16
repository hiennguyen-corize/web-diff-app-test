export const getCoords = (element: HTMLElement | null) => {
  if (!element) {
    return;
  }

  const box = element.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.floor(top), left: Math.floor(left) };
};

export const getOffsetPosition = (element: HTMLElement) => {
  const viewportOffset = element.getBoundingClientRect();
  const top = viewportOffset.top;
  const left = viewportOffset.left;
  return { top, left };
};

export const getHeight = (element: HTMLElement | null) => {
  if (!element) {
    return 0;
  }

  return element.offsetHeight;
};

export const getWidth = (element: HTMLElement | null) => {
  if (!element) {
    return 0;
  }

  return element.offsetWidth;
};

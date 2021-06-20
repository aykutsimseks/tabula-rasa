export const onPageScroll = (onScrollCallback) => {
  const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
  const body = document.body;
  const html = document.documentElement;
  const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  const windowBottom = windowHeight + window.pageYOffset;

  if (windowBottom >= (docHeight - 50)) {
    onScrollCallback();
  }
};

export const groupBy = (list, keyGetter) => {
  const map = {};
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map[key];
    if (!collection) {
      map[key] = [item];
    } else {
      map[key].push(item);
    }
  });
  return map;
};

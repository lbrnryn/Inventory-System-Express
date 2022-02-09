class Http {
  constructor() {
    }
  async get(url) {
    const res = await fetch(url);
    return res.json();
  }
  async remove(url) {
    const res = await (fetch(url, { method: 'DELETE' }));
    return res.json();
  }
}

export { Http };

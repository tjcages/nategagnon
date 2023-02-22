export class Animation {
  element: HTMLElement | null;
  observerIn: IntersectionObserver | undefined;

  constructor(element: HTMLElement | null) {
    this.element = element;

    this.createObserver();
    this.start();
  }

  createObserver() {
    this.observerIn = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) this.animIn();
      },
      {
        root: null,
        threshold: 0.8,
        rootMargin: `0px`,
      }
    );
  }

  start() {
    if (this.element && this.observerIn) this.observerIn.observe(this.element);
  }

  stop() {
    if (this.element && this.observerIn)
      this.observerIn.unobserve(this.element);
  }

  animIn(): void {}
  animOut(): void {}
  setIn(): void {}
  setOut(): void {}
}

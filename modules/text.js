import gsap from "gsap";
import SplitType from "split-type";

import { Animation } from "./anim";
import { anim } from "./config";

/*
 * Titles
 */

export class Text extends Animation {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitLines(this.element);
  }

  animIn() {
    if (this.animation) this.animation.kill();

    this.animation = gsap.to(this.animated, {
      y: "0%",
      duration: anim.in.duration,
      ease: anim.in.ease,
      delay: anim.in.delay,
      stagger: {
        each: anim.in.stagger,
        from: anim.in.from,
      },
    });
  }

  animOut() {
    if (this.animation) this.animation.kill();

    return new Promise((resolve) => {
      this.animation = gsap.to(this.animated, {
        y: "210%",
        duration: anim.out.duration * 0.5,
        ease: anim.out.ease,
        delay: anim.out.delay,
        stagger: {
          each: anim.out.stagger * 0.2,
          from: anim.out.from,
        },
        onComplete: resolve,
      });
    });
  }

  setIn() {
    if (this.animation) this.animation.kill();

    gsap.set(this.animated, {
      y: "0%",
    });
  }

  setOut() {
    if (this.animation) this.animation.kill();

    gsap.set(this.animated, {
      y: "210%",
    });
  }

  /* -- Lifecycle */
  animOutAndClear() {
    this.stop();
    this.animOut();
  }
}

/*
 * Splits
 */

export class Char extends Text {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitChars(this.element);
  }
}

export class Word extends Text {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitWords(this.element);
  }
}

export class Line extends Text {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitLines(this.element);
  }
}

export function animateIn(type, target) {
  const id = `[animate=${target}]`;
  switch (type) {
    case "char":
      return [...document.querySelectorAll(id)].map((item) => {
        const el = new Char(item);
        el.setOut();
        el.animIn();

        return el;
      });
    case "word":
      return [...document.querySelectorAll(id)].map((item) => {
        const el = new Word(item);
        el.setOut();
        el.animIn();

        return el;
      });
    case "line":
      return [...document.querySelectorAll(id)].map((item) => {
        const el = new Line(item);
        el.setOut();
        el.animIn();

        return el;
      });
    default:
      return [...document.querySelectorAll(id)].map((item) => {
        const el = new Word(item);
        el.setOut();
        el.animIn();

        return el;
      });
  }
}

export function animateOut(type, target) {
  const id = `[animate=${target}]`;
  switch (type) {
    case "char":
      return [...document.querySelectorAll(id)].map((item) => {
        const el = new Char(item);
        el.setIn();
        el.animOut();

        return el;
      });
    case "word":
      return [...document.querySelectorAll(id)].map((item) => {
        const el = new Word(item);
        el.setIn();
        el.animOut();

        return el;
      });
    case "line":
      return [...document.querySelectorAll(id)].map((item) => {
        const el = new Line(item);
        el.setIn();
        el.animOut();

        return el;
      });
    default:
      return [...document.querySelectorAll(id)].map((item) => {
        const el = new Word(item);
        el.setIn();
        el.animOut();

        return el;
      });
  }
}

/*
 * Utils
 */

const splitChars = (el) => {
  return new SplitType(el, { types: "chars" }).chars;
};

const splitWords = (el) => {
  return new SplitType(el, { types: "words" }).words;
};

const splitLines = (el) => {
  return new SplitType(el, { types: "lines" }).lines;
};

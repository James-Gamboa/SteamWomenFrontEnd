import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const fadeInUp = (element: string | Element, delay = 0) => {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
  });
};

export const textReveal = (element: string | Element) => {
  const split = new SplitText(element, { type: 'chars,words' });
  
  return gsap.from(split.chars, {
    opacity: 0,
    scale: 0,
    y: 80,
    rotationX: 180,
    transformOrigin: '0% 50% -50',
    duration: 0.8,
    stagger: 0.02,
    ease: 'back.out(1.7)',
  });
};

export const heroTextReveal = (element: string | Element) => {
  const split = new SplitText(element, { type: 'chars,words' });
  
  return gsap.from(split.chars, {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.05,
    ease: 'power4.out',
    onComplete: () => {
      gsap.to(split.chars, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out',
      });
    }
  });
};

export const parallaxScroll = (element: string | Element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

export const gridReveal = (elements: string | Element) => {
  return gsap.from(elements, {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    stagger: {
      amount: 0.8,
      grid: 'auto',
      from: 'center',
    },
    ease: 'power2.out',
    scrollTrigger: {
      trigger: elements,
      start: 'top 80%',
    },
  });
};

export const magneticHover = (element: string | Element) => {
  const magnet = element as HTMLElement;
  
  magnet.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = magnet.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    gsap.to(magnet, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  magnet.addEventListener('mouseleave', () => {
    gsap.to(magnet, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  });
};

export const scrollReveal = (element: string | Element) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    y: 60,
    scale: 0.95,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
};

export const fadeInSection = (selector: string) => {
  gsap.utils.toArray(selector).forEach((section: any) => {
    gsap.from(section, {
      opacity: 0,
      y: 60,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });
};

export const cardPopIn = (selector: string) => {
  gsap.utils.toArray(selector).forEach((card: any) => {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 16;
      const rotateX = -((y - centerY) / centerY) * 16;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
      card.style.opacity = "1";
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
      card.style.opacity = "1";
    });
  });
};

export const animateCounters = (selector: string) => {
  gsap.utils.toArray(selector).forEach((counter: any) => {
    const end = +counter.dataset.end;
    gsap.fromTo(counter, { innerText: 0 }, {
      innerText: end,
      duration: 2,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: counter,
        start: 'top 80%',
        once: true,
      },
      onUpdate: function () {
        counter.innerText = Math.floor(counter.innerText);
      },
    });
  });
};

export const fadeInSideSection = (selector: string) => {
  gsap.utils.toArray(selector).forEach((section: any, i: number) => {
    gsap.from(section, {
      opacity: 0,
      x: i % 2 === 0 ? -120 : 120,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });
}; 
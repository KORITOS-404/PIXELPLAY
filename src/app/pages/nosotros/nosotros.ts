import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  imports: [],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros implements OnInit, OnDestroy {
  private animationFrameId: number | null = null;
  private observers: IntersectionObserver[] = [];

  ngOnInit() {
    this.initScrollAnimations();
    this.animateCounters();
    this.initParallaxEffect();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.observers.forEach(observer => observer.disconnect());
  }

  private initScrollAnimations() {
    // Intersection Observer para animaciones al hacer scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observar elementos con atributos data-aos
    const elementsToObserve = document.querySelectorAll('[data-aos]');
    elementsToObserve.forEach(el => observer.observe(el));
    this.observers.push(observer);
  }

  private animateCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const target = parseInt(element.getAttribute('data-target') || '0');
          this.animateNumber(element, target);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => observer.observe(el));
    this.observers.push(observer);
  }

  private animateNumber(element: HTMLElement, target: number) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toString() + (target === 99 ? '%' : '+');
        clearInterval(timer);
      } else {
        element.textContent = Math.ceil(current).toString();
      }
    }, 30);
  }

  private initParallaxEffect() {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-icon');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup en ngOnDestroy
    const originalNgOnDestroy = this.ngOnDestroy;
    this.ngOnDestroy = () => {
      window.removeEventListener('scroll', handleScroll);
      originalNgOnDestroy.call(this);
    };
  }
}

// components/about/TimelineSection.jsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection({ darkMode }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timeline = [
    {
      year: '2020',
      title: 'TPF Aid launches',
      description:
        'Started with a small team and a big dream to connect donors with causes worldwide.',
      amount: '₹0',
    },
    {
      year: '2021',
      title: 'First milestone',
      description:
        'Reached ₹50M in donations, helping thousands of families across 30 countries.',
      amount: '₹50M',
    },
    {
      year: '2022',
      title: 'Rapid growth',
      description:
        'Expanded to 80+ countries and launched mobile app, making giving even more accessible.',
      amount: '₹150M',
    },
    {
      year: '2023',
      title: 'Community impact',
      description:
        'Hit 1 million donors milestone and introduced recurring donation features.',
      amount: '₹350M',
    },
    {
      year: '2024',
      title: 'Global recognition',
      description:
        'Awarded Best Crowdfunding Platform and reached 120 countries worldwide.',
      amount: '₹500M+',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`py-20 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            Our{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">
              Journey
            </span>
          </h2>
          <p
            className={`text-lg ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            From humble beginnings to global impact
          </p>
        </div>

        <div className="timeline-container relative">
          {/* Vertical line */}
          <div
            className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 ${
              darkMode ? 'bg-zinc-700' : 'bg-zinc-200'
            }`}
          ></div>

          {timeline.map((item, i) => (
            <div
              key={i}
              className={`timeline-item relative mb-12 ${
                i % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              <div
                className={`md:w-1/2 pl-16 md:pl-0 ${
                  i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}
              >
                <div
                  className={`p-6 rounded-2xl ${
                    darkMode ? 'bg-zinc-800' : 'bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-semibold">
                      {item.year}
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        darkMode ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    >
                      {item.amount}
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`${
                      darkMode ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transform -translate-x-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
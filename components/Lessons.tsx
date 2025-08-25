
import React from 'react';
import { LESSONS } from '../constants';

const Lessons: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">บทเรียนเกี่ยวกับ chmod</h2>
      <div id="accordion-collapse" data-accordion="collapse">
        {LESSONS.map((lesson, index) => (
          <div key={index}>
            <h2 id={`accordion-collapse-heading-${index + 1}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-400 border border-gray-700 focus:ring-4 focus:ring-gray-800 hover:bg-gray-800 gap-3"
                data-accordion-target={`#accordion-collapse-body-${index + 1}`}
                aria-expanded={index === 0}
                aria-controls={`accordion-collapse-body-${index + 1}`}
              >
                <span className="text-xl text-gray-200">{lesson.title}</span>
                <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>
            </h2>
            <div id={`accordion-collapse-body-${index + 1}`} className={index === 0 ? '' : 'hidden'} aria-labelledby={`accordion-collapse-heading-${index + 1}`}>
              <div className="p-5 border border-t-0 border-gray-700 bg-gray-800 prose prose-invert prose-p:text-gray-300 prose-strong:text-cyan-300 prose-ul:text-gray-300 prose-code:text-yellow-300">
                <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons;

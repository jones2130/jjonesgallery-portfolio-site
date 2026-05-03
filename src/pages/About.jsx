import React from 'react';
import StructuredData from '@/components/StructuredData';
import usePageMeta from '@/hooks/usePageMeta';
import './About.css';

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'James J Jones',
  url: 'https://www.jamesjjonesgallery.com/about',
  sameAs: [
    'https://www.redbubble.com/people/jamesjjonesart/shop/',
    'https://ko-fi.com/jamesjjonesart',
    'https://www.linkedin.com/in/james-jones-a3472826',
  ],
  jobTitle: 'Visual Artist',
  description:
    'Visual artist working primarily in oil, acrylic, and mixed media. His work explores the interplay of light, landscape, and memory.',
};

export default function About() {
  usePageMeta({
    title: 'About',
    description:
      'Learn about artist James J Jones and his practice in oil, acrylic, and mixed media painting.',
    url: '/about',
  });

  return (
    <div className="about-page page-section">
      <StructuredData schema={PERSON_SCHEMA} />
      <div className="container about-page__layout">
        {/* Sidebar placeholder for portrait */}
        <div className="about-page__image-wrap">
          <div className="about-page__image-placeholder" aria-hidden="true">
            <span>Photo coming soon</span>
          </div>
        </div>

        {/* Text content */}
        <div className="about-page__text fade-up">
          <p className="about-page__eyebrow">About the Artist</p>
          <h1 className="page-title">James J Jones</h1>

          <p>
            James J Jones is a visual artist working primarily in oil, acrylic, and mixed media.
            His work explores the interplay of light, landscape, and memory — from intimate figure
            studies to expansive nature scenes.
          </p>

          <p>
            Rooted in observational painting and drawing, James's practice balances careful
            technical study with an openness to accident and improvisation. He works both en
            plein air and in the studio, often returning to the same subject across different
            seasons and media.
          </p>

          <p>
            Prints and merchandise are available through{' '}
            <a href="https://www.redbubble.com/people/jamesjjonesart/shop/" target="_blank" rel="noopener noreferrer">
              Redbubble
            </a>
            , and support and monetary donations can be made through his{' '}
            <a href="https://ko-fi.com/jamesjjonesart" target="_blank" rel="noopener noreferrer">
              Ko-Fi page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

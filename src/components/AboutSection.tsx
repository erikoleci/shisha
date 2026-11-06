import React from 'react';
import { WHATSAPP_CONFIG } from '../config/whatsapp';

const points = [
  {
    title: 'Vetëm produkte origjinale',
    text: 'Shisha, argjila, aroma dhe aksesorë nga markat që i njohim dhe i përdorim vetë.',
  },
  {
    title: 'Materiale që zgjasin',
    text: 'Çelik inox 304, kristal i punuar me dorë dhe alumin i anodizuar.',
  },
  {
    title: 'Dërgesë në 24–48 orë',
    text: 'Dërgojmë në çdo qytet të Shqipërisë, me paketim që e mbron qelqin.',
  },
  {
    title: 'Porosi pa regjistrim',
    text: `Na shkruaj në WhatsApp te ${WHATSAPP_CONFIG.displayNumber} dhe e mbyllim porosinë në bisedë.`,
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <span className="rule mb-6" />
          <h2 className="display text-3xl sm:text-4xl text-bone">Rreth nesh</h2>
          <p className="mt-4 text-slate-400 leading-relaxed max-w-sm">
            MRA Shisha është dyqan online në Tiranë për shisha, aroma dhe aksesorë, me porosi direkte në WhatsApp.
          </p>
        </div>

        <dl className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10">
          {points.map((p) => (
            <div key={p.title} className="py-6 border-t border-bone/10">
              <dt className="text-lg font-medium text-bone">{p.title}</dt>
              <dd className="mt-2 text-slate-400 leading-relaxed">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

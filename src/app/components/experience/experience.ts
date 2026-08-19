import { Component } from '@angular/core';

interface ExperienceItem {
  period: string;
  title: string;
  place: string;
  description: string;
  type: 'formation' | 'experience';
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {
  items: ExperienceItem[] = [
    {
      period: 'Jan 2026— Présent',
      title: 'Formation en développement web',
      place: 'Digital Growth Academy',
      description: 'Apprentissage du développement front-end et back-end : HTML, CSS, JavaScript, React,Gestion de projet, bases de données.',
      type: 'formation'
    },
     {
      period: ' Juin 2026',
      title: 'Formation en Front-End avec Angular',
      place: 'Orange Digital Center',
      description: 'Apprentissage du développement front-end avec Angular cli 22',
      type: 'formation'
    },
    {
      period: '2025',
      title: 'Projet Virtual Election',
      place: 'Projet de groupe ',
      description: 'Conception et développement d\'une plateforme de vote en ligne complète, du prototype au déploiement.',
      type: 'experience'
    },
    {
      period: '2024— 2026',
      title: 'Deug en Informatique',
      place: 'Université de Douala',
      description: 'Description courte de cette étape de ton parcours.',
      type: 'formation'
    }
  ];
}
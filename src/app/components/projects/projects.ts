import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {

  projects: Project[] = [
     {
      title: 'BiteMub',

      description:
        'Application e-commerce moderne avec catalogue de produits, panier et interface responsive.',

      image: 'bitemub1.png',

      tags: [
        'React',
        'Vite',
        'Tailwind CSS'
      ],

      demoUrl:
        'https://mon-projet-swart-theta.vercel.app/',

      codeUrl:
        'https://github.com/Lesline-noteze/mon-projet'
    },
     {
      title: 'Le caléo doré',

      description:
        ' interface responsive.',

      image: 'calao.png',

      tags: [
        'Angular',
        'cli',
        'CSS 5'
      ],

      demoUrl:
        'https://caleo-dore.vercel.app/',

      codeUrl:
        'https://github.com/Lesline-noteze/le-caleo-dore.git'
    },
     {
      title: 'Délice de Douala',

      description:
        'Application e-commerce moderne avec catalogue de produits, panier et interface responsive.',

      image: 'delice-de-douala.png',

      tags: [
        'Angular Cli',
        ' CSS 5'
      ],

      demoUrl:
        'https://delice-de-douala-8woy.vercel.app/',

      codeUrl:
        'https://github.com/Lesline-noteze/le-caleo-dore.git'
    },

    {
      title: 'Virtual Election',

      description:
        'Plateforme de vote en ligne permettant de gérer les candidatures, les inscriptions et les résultats.',

      image: 'virtual-election.png',

      tags: [
        'HTML',
        'CSS',
        'Bootstrap'
      ],

      demoUrl:
        'https://virtual-election-umber.vercel.app/',

      codeUrl:
        'https://github.com/Lesline-noteze/virtual-election'
    },

   
    

  ];

}
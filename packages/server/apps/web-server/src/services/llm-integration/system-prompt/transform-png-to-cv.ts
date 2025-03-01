export const transformPngToCvFormatSystemPrompt = `
  You receive images and you must transform them into the CV in the format you are provided with.
  You must not lost any information.
  If there's no CV in the image(s), you should output 'null' for the cv. 
  Also, there should be a comment describing:
   - the error, for example: "No CV found in the image. This is the image of a cat."
   - if successfully: the comment that looks roughly like "created a cv for ..." 
 
  
  here's an example of how the CV might look like. So you understand the structure.
  'positionIndex' field is used to determine the order of the entries. The lower the number, the higher the entry is in the CV.
  
  export const exampleEducationEntries = [
    {
      name: 'Brno University of Technology',
      degree: 'Bachelor in Information Technology',
      duration: '2020 — 2023',
      description: 'Top 1% student, specialized in AI, data analysis and theoretical computer science',
      skills: [
        'Python',
        'C/C++',
        'Big Data',
        'Machine Learning',
        'Deep Learning',
      ],
      location: 'Brno, Czechia',
      positionIndex: 0,
    },
  ];

  export const exampleWorkExperienceEntries = [
    {
      position: 'Senior Software Engineer',
      name: 'Dishboard',
      type: 'Contract',
      location: 'Prague, Czechia',
      duration: '2024 - Present',
      description: ${'```'}
        Developing a financial application for restaurant businesses with a focus on data-driven features.
        Built a data pipeline integrating an LLM with OCR for invoice auto-approval, improving approval rate by 45%.
        Developed large features completely independently, including a whole new subscription model for the application.
        Worked with external APIs, including Stripe API, POS integration APIs and CNB API.
      ${'```'},
      skills: [
        'NestJS',
        'Python',
        'TypeORM',
        'ReactJS',
        'OpenAI API',
        'Stripe API',
        'GraphQl',
        'UX/UI',
      ],
      positionIndex: 0,
    },
    {
      position: 'Senior Software Engineer',
      name: 'Gen (ex Avast)',
      type: 'Full-time',
      location: 'Prague, Czechia',
      duration: '2024',
      description: ${'```'}
        Working on an internal projects for developers, product and project managers.
        Built ETL pipelines to gather data from multiple sources and provide actionable insights.
        Came up and developed AI-powered features to enhance the developer/user experience.
        Handling different aspects of a project lifecycle: CI/CD, process establishment (Jira, Confluence), conflict resolution within the team, communication with end users/customers, and other possible stuff.
      ${'```'},
      skills: [
        'ReactJS',
        'PSQL',
        'TeamCity',
        'GCP',
        'ReactJS',
        'Kubernetes',
        'Docker',
      ],
      positionIndex: 1,
    },
    {
      position: 'Software Engineer',
      name: 'Salsita Software',
      type: 'Full-time',
      location: 'Prague, Czechia',
      duration: '2023 - 2024',
      description: ${'```'}
        Created a LLM-powered UI for a 3D product configurator, driving the company’s mid-term strategic goal.
        Enhanced CI/CD pipelines and rescued eBay’s Social Hub platform, extending the contract by two quarters.
      ${'```'},
      skills: [
        'OpenAI API',
        'Kotlin',
        'NodeJS',
        'ReactJS',
        'GraphQL',
        'Jenkins',
        'ThreeJS',
      ],
      positionIndex: 2,
    },
    {
      position: 'AI Researcher',
      type: 'Full-time',
      name: 'BUT Speech',
      location: 'Brno, Czechia',
      duration: '2021 - 2023',
      description: ${'```'},
        Fine-tuned ASR models, enhancing Czech end-to-end ASR systems for Seznam.cz.
        Won the 2nd place in Albaizyn challenge and the 3rd place on MTM22 marathon.
        Specialized on data processing, joint models, efficient inference, and transformer adaptors.
        Prepared over 20 large text and audio-visual datasets for training deep neural networks.
      
      ${'```'},
      skills: [
        'Academic Research in ASR/NLP',
        'Big Data',
        'Python',
        'Seaborn',
        'Pandas',
        'Pytorch/HuggingFace/Nvidia NeMo',
      ],
      positionIndex: 3,
    },
  ];

  export const exampleProjectEntries = [
      {
      name: 'Various Coding Projects',
      description: ${'```'}
        Developed a compiler for Lua in C; a diagram editor in C++/Qt.
        Specialized in database design and optimization. I love system design and complex DB architecture.
        Written over 50 Python scripts for dataset processing.
        Used to work with python Django framework for web development (a platform for research conference management).
        Smaller pet-projects including a packet sniffer, spreadsheet processors, and an IoT system for automatic light control.
        ${'```'},
      skills: [
        'C/C++',
        'Python',
        'Django',
        'Qt',
        'Database Design',
        'System Architecture',
      ],
      positionIndex: 1,
    },
    {
      name: 'Machine Learning Projects',
      description: ${'```'}
        Got the 2nd place in the [Albayzin 2022 ASR challenge](https://www.fit.vut.cz/research/group/speech/public/publi/2022/kocour22_iberspeech.pdf).
        Got the 3rd place in MTM22 (Machine Translation Marathon) by implementing an ASR model for TED talks using transformer adaptors.
        Created a [joint model](https://github.com/SkuratovichA/SUR) for person identification by speech and image. Implemented a logic for joining outputs from these two modalities.
        ${'```'}
      skills: [
        'Pytorch',
        'HuggingFace',
        'Nvidia NeMo',
        'Seaborn',
        'Pandas',
        'NLP',
        'ASR',
      ],
      positionIndex: 2,
    },
  ];

  export const exampleContactInfoEntries = [
    {
      linkName: 'LinkedIn',
      link: 'https://www.linkedin.com/in/aliaksandr-skuratovich-4a2ab01a0',
      positionIndex: 0,
    },
    {
      linkName: 'Github',
      link: 'github.com/SkuratovichA',
      positionIndex: 1,
    },
    {
      linkName: 'Email',
      link: 'skuratovich.aliaksandr@gmail.com',
      positionIndex: 2,
    },
  ];

  export const exampleSkillEntries = [
    {
      category: 'Soft Skills',
      skills: [
        'Management',
        'Team Leading',
        'Working under tight deadlines',
        'Problem Solving',
      ],
      positionIndex: 0,
    },
    {
      category: 'Tools',
      skills: [
        'TypeScript/Python/Kotlin',
        'ReactJS/RemixJS/NextJS',
        'NestJS/Express/Django/FastAPI/Spring',
        'Pytorch/HuggingFace',
        'REST/GraphQL',
        'Postgres/MongoDB/Redis',
        'Docker/Kubernetes',
        'TeamCity/Jenkins/Github Actions',
      ],
      positionIndex: 1,
    },
    {
      category: 'Languages',
      skills: ['Czech', 'English', 'Ukrainian'],
      positionIndex: 2,
    },
  ];

  export const exampleAboutMe = {
    name: 'Aliaksandr Skuratovich',
    fieldName: 'whoami',
    description: ${'```'}
      An engineer with a mix of fullstack development experience and AI.
      Proven track record in developing AI-powered solutions.
      Skilled in managing project lifecycles from inception to deployment, including CI/CD pipelines.
      When not working, I train for triathlons.
    ${'```'}
  };
`;

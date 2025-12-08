(function checkEnvVars() {
  if (process.env.NODE_ENV === 'production') {
    /**
     * only check for Environment Variables in the initial run
     * and ignore these checks in gatsby build stages
     */
    if (process.env.GATSBY_BUILD_STAGE) {
      return;
    }

    if (!process.env.CONTACT_FORM_ENDPOINT) {
      throw new Error('Contact Form Endpoint is not defined. `WARN` Contact Form will not work');
    }
    if (!process.env.GA_TRACKING_ID) {
      throw new Error('Google Analytics Tracking ID is not defined. `WARN` Google Analytics will not work');
    }
  }
}());

module.exports = {
  pathPrefix: '',
  siteUrl: 'https://MominBinShahid.github.io',
  siteTitle: 'Momin Bin Shahid',
  siteDescription:
    'Momin Bin Shahid`s home on web. Momin Bin Shahid is a curious software engineer 👨‍💻, let`s connect 🤙 @MominBinShahid',
  author: 'Momin Bin Shahid',
  postsForArchivePage: 3,
  defaultLanguage: 'en',

  disqusScript: process.env.DISQUS_SCRIPT,
  contactFormUrl: process.env.CONTACT_FORM_ENDPOINT,
  googleAnalyticTrackingId: process.env.GA_TRACKING_ID || '',

  resume: '../MominBinShahid_Resume.pdf',
  legacy_resume: '../MominBinShahid_Legacy.pdf',

  pages: {
    // home: '/',
    // blog: 'blog',
    // contact: 'contact',
    // resume: 'resume',
    // tag: 'tags',
    home: { name: 'Home', path: '' },
    blog: { name: 'Blog', path: 'blog', hide: true },
    tag: { name: 'Tags', path: 'tags', hide: true },
    contact: { name: 'Contact', path: 'contact' },
    resume: { name: 'Resume', path: 'resume' },
  },
  social: {
    linkedin: {
      link: 'https://linkedin.com/in/mominbinshahid',
      icon: 'linkedin',
      'icon-square': 'linkedin-square',
      color: '#0a66c2',
    },
    stackoverflow: {
      link: 'https://stackoverflow.com/users/9137804/MominBinShahid',
      icon: 'stack-overflow',
      color: '#f48024',
    },
    github: {
      link: 'https://github.com/MominBinShahid',
      icon: 'github-alt',
      'icon-square': 'github-square',
      color: '#333',
    },
    twitter: {
      link: 'https://twitter.com/MominBinShahid',
      icon: 'twitter',
      'icon-square': 'twitter-square',
      color: '#1da1f2',
    },
    instagram: {
      link: 'https://www.instagram.com/MominBinShahid',
      icon: 'instagram',
      color: '#c32aa3',
      hide: true,
    },
    youtube: {
      link: 'https://www.youtube.com/@MominBinShahid',
      icon: 'youtube-play',
      'icon-square': 'youtube-square',
      color: '#ff0000',
      hide: true,
    },
    facebook: {
      link: 'https://www.facebook.com/MominBinShahid',
      icon: 'facebook',
      'icon-square': 'facebook-square',
      color: '#1877f2',
      hideOnSidebar: true,
    },
    reddit: {
      link: 'https://www.reddit.com/user/mominbinshahid/',
      icon: 'reddit-alien',
      'icon-square': 'reddit-square',
      color: '#FF4500',
      hideOnSidebar: true,
    },
    discord: {
      link: 'https://discordapp.com/users/MominBinShahid#6892',
      'icon-svg': '',
      useSVG: true,
      color: '#5865F2',
      hideOnSidebar: true,
    },
    codepen: {
      link: 'https://codepen.io/MominBinShahid/',
      icon: 'codepen',
      color: '#000000',
      hideOnSidebar: true,
    },
    skype: {
      link: 'https://join.skype.com/invite/i0G7bv3hbB9y',
      icon: 'skype',
      color: '#00aff0',
      hideOnSidebar: true,
    },
    whatsapp: {
      link: 'https://wa.me/923343526270',
      icon: 'whatsapp',
      color: '#4AC959',
      hideOnSidebar: true,
    },

    // hacker-news
    // y-combinator
    // pinterest
    // quora
    // slack
    // snapchat
    // decide skype momin8003 ?
    // telegram
    // twitch
    // wechat
    // bitbucket
    // dev.to
    // hackerrank
    // medium

    rss: { link: '/rss.xml', hide: true }, // TODO: @Momin see this
  },

  tags: {
    javascript: {
      name: 'javascript',
      description:
        'JavaScript is an object-oriented programming language used alongside HTML and CSS to give functionality to web pages.',
      color: '#f0da50',
    },
    nodejs: {
      name: 'Node.js',
      description:
        'Node.js is a tool for executing JavaScript in a variety of environments.',
      color: '#90c53f',
    },
    typescript: {
      name: 'typescript',
      description:
        'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
      color: '#257acc',
    },
    reactjs: {
      name: 'reactjs',
      description:
        'React is an open source JavaScript library used for designing user interfaces.',
      color: '#61dbfa',
    },
    gatsby: {
      name: 'Gatsby.js',
      description:
        'A framework built over ReactJS to generate static page web application.  ',
      color: '#6f309f',
    },
    html: {
      name: 'HTML',
      description:
        'A markup language that powers the web. All websites use HTML for structuring the content.',
      color: '#dd3431',
    },
    css: {
      name: 'css',
      description:
        'CSS is used to style the HTML element and to give a very fancy look for the web application.',
      color: '#43ace0',
    },
    python: {
      name: 'python',
      description:
        'A general purpose programming language that is widely used for developing various applications.',
      color: '#f9c646',
    },
  },

  keywords: [
    '@MominBinShahid',
    'MominBinShahid',
    'Momin Bin Shahid',
    'Momin',
    'Software Developer',
    'Software Development Engineer',
    'Software Engineer',
    'Senior Software Engineer',
    'Senior Software Development Engineer',
    'Lead Engineer',
    'AI Engineer',
    'FullStack Developer',
    'Full-Stack Engineer',
    'Full-Stack Developer',
    'Full-Stack Software Engineer',
    'Full-Stack Software Developer',
    'Full-Stack Software Development Engineer',
    'Frontend Engineer',
    'Frontend Developer',
    'Javascript',
    'React.js',
    'Node.js',
    'Vue.js',
    'ReactJS',
    'NodeJS',
    'VueJS',
    'React',
    'Node',
    'Vue',
    'Web',
    'Technology',
    'AI',
    'AI Agents',
    'LLMs',
    'LangChain',
    'LangGraph',
    'Docker',
    'Kubernetes',
    'AWS',
    'GCP',
  ],

  skills: {
    enabled: false, // Set to true to show skills section
    data: [
      [
        { name: 'JavaScript / TypeScript', percentage: 95 },
        { name: 'React.js', percentage: 92 },
        { name: 'Node.js', percentage: 90 },
        { name: 'Python', percentage: 85 },
      ],
      [
        { name: 'AI Agents / LLMs', percentage: 88 },
        { name: 'LangChain / LangGraph', percentage: 85 },
        { name: 'Docker / Kubernetes', percentage: 82 },
        { name: 'AWS / GCP', percentage: 80 },
      ],
    ],
  },
};

module.exports = {
  pathPrefix: '',
  siteUrl: 'https://MominBinShahid.github.io',
  siteTitle: 'Momin Bin Shahid',
  siteDescription: 'Logbook of a software engineer @MominBinShahid',
  author: 'Momin Bin Shahid',
  postsForArchivePage: 3,
  defaultLanguage: 'en',

  disqusScript: process.env.DISQUS_SCRIPT,
  contactFormUrl: process.env.CONTACT_FORM_ENDPOINT,
  googleAnalyticTrackingId: process.env.GA_TRACKING_ID || '',
  resumeDownloadLink: '../Momin_Bin_Shahid.pdf',
  resumePrintableDownloadLink: '../Momin_Bin_Shahid-For_Print_Only.pdf',

  pages: {
    // home: '/',
    // blog: 'blog',
    // contact: 'contact',
    // resume: 'resume',
    // tag: 'tags',
    home: { name: 'Home', path: '' },
    contact: { name: 'Contact', path: 'contact' },
    blog: { name: 'Blog', path: 'blog', hide: true },
    tag: { name: 'Tags', path: 'tags', hide: true },
    resume: { name: 'Resume', path: 'resume' },
  },
  social: {
    twitter: { link: 'https://twitter.com/MominBinShahid', icon: 'twitter' },
    github: { link: 'https://github.com/MominBinShahid', icon: 'github' },
    linkedin: { link: 'https://pk.linkedin.com/in/mominbinshahid', icon: 'linkedin-square' },
    stackoverflow: { link: 'https://stackoverflow.com/users/9137804/MominBinShahid', icon: 'stack-overflow' },
    instagram: { link: 'https://www.instagram.com/MominBinShahid', icon: 'instagram', hide: true },
    facebook: { link: 'https://www.facebook.com/MominBinShahid', icon: 'facebook-official' },
    rss: { link: '/rss.xml', hide: true }, // TODO: @Momin see this
  },

  tags: {
    javascript: {
      name: 'javascript',
      description: 'JavaScript is an object-oriented programming language used alongside HTML and CSS to give functionality to web pages.',
      color: '#f0da50',
    },
    nodejs: {
      name: 'Node.js',
      description: 'Node.js is a tool for executing JavaScript in a variety of environments.',
      color: '#90c53f',
    },
    typescript: {
      name: 'typescript',
      description: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
      color: '#257acc',
    },
    reactjs: {
      name: 'reactjs',
      description: 'React is an open source JavaScript library used for designing user interfaces.',
      color: '#61dbfa',
    },
    gatsby: {
      name: 'Gatsby.js',
      description: 'A framework built over ReactJS to generate static page web application.  ',
      color: '#6f309f',
    },
    html: {
      name: 'HTML',
      description: 'A markup language that powers the web. All websites use HTML for structuring the content.',
      color: '#dd3431',
    },
    css: {
      name: 'css',
      description: 'CSS is used to style the HTML element and to give a very fancy look for the web application.',
      color: '#43ace0',
    },
    python: {
      name: 'python',
      description: 'A general purpose programming language that is widely used for developing various applications.',
      color: '#f9c646',
    },

  },
};

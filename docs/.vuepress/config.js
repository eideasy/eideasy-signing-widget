module.exports = {
  title: 'eID Easy Widget',
  description: 'Documentation for the eID Easy Widget',
  themeConfig: {
    logo: '/assets/img/eid-easy-logo.png',
    nav: [
      { text: 'Home', link: '/'},
      { text: 'Guide', link: '/guide/'},
    ],
    sidebar: {
      '/guide/': [
        '',
        'introduction',
        'another',
      ],
      '/second/': [
        '',
      ]
    },
  }
}

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: "",
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: "img/logo-taro.png",
    infoLink: "/qie",
    pinned: true
  }
];

const siteConfig = {
  editUrl: "https://github.com/nervjs/taro/edit/master/docs/",
  title: "Qie" /* title for your website */,
  tagline:
    "SPA、MPA 前端项目部署工具，支持 Nginx、OSS CDN 两种部署方式，支持构建不同环境压缩包，同步备份至OSS，并记录版本信息至数据库。",
  url: "https://git-lt.github.io/qiejs/" /* your website url */,
  baseUrl: "/qiejs/" /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: "QieDocs",
  organizationName: "QieTeam",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "README", label: "文档" },
    // { doc: "components-desc", label: "组件库" },
    // { doc: "apis/about/desc", label: "API" },
    // { href: "https://github.com/NervJS/taro", label: "GitHub" },
    // { doc: "", label: "|" },
    // { href: "https://taro-ui.jd.com", label: "Taro-UI" },
    // { href: "https://taro-ext.jd.com", label: "物料市场" },
    // { href: "https://taro-club.jd.com", label: "论坛" },
    { search: true }
  ],

  algolia: {
    apiKey: "57b9948bff42bc0dbc6c219556fbae35",
    indexName: "qie"
  },

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: "img/logo-taro.png",
  footerIcon: "img/logo-taro.png",
  favicon: "img/favicon.ico",

  /* colors for website */
  colors: {
    primaryColor: "rgb(40, 43, 46)",
    secondaryColor: "#4a72ea"
  },

  /* custom fonts for website */
  /* fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  }, */

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: "Copyright © " + new Date().getFullYear() + " ltp11",

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: "tomorrow-night"
  },

  usePrism: true,

  // Add custom scripts here that would be placed in <script> tags
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://jdc.jd.com/demo/talenttest/js/url.js",
    {
      src: "https://storage.jd.com/taro-resource/tongji.js",
      async: true
    }
  ],

  /* On page navigation for the current documentation page */
  onPageNav: "separate",

  /* Open Graph and Twitter card images */
  ogImage: "img/logo-taro.png",
  twitterImage: "img/logo-taro.png",

  scrollToTop: true,
  docsSideNavCollapsible: true

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;

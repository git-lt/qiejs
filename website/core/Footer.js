/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");
class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" id="footer">
        <div className="grid_c1 footer_cont">
          <div className="footer_logo_container">
            {/* <div className="footer_logo" /> */}
            {/* <span className="footer_designedby" /> */}
          </div>
          <div className="footer_link_container">
            <div className="footer_link">
              <h3 className="footer_link_tit footer_link_tit1">相关资源</h3>
              <p>
                <a className="link" href="https://taro.jd.com/" target="_blank">
                  Qie
                </a>
              </p>
            </div>
            <div className="footer_link">
              <h3 className="footer_link_tit footer_link_tit2">社区</h3>
              <p>
                <a href="https://github.com/NervJS/taro/issues" target="_blank">
                  GitHub
                </a>
              </p>
            </div>
            <div className="footer_link">
              <h3 className="footer_link_tit footer_link_tit3">关于我们</h3>
              <p>
                <a href="https://aotu.io/join/" target="_blank">
                  加入我们
                </a>
              </p>
            </div>
            <div className="footer_link">
              <h3 className="footer_link_tit footer_link_tit4">感谢</h3>
              <p>
                <a href="http://jdc.jd.com/" target="_blank">
                  用户体验设计部
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="in">Copyright © 2019. All Rights Reserved.</div>
        </div>
      </footer>
    );
  }
}

module.exports = Footer;

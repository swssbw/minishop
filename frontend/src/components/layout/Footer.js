import React from "react";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footerWrap">
          이 웹사이트는 포트폴리오 용도로 제작하였으며 상업적인 용도로 사용하지
          않음을 밝힙니다.
          <br />
          Built with ReactJS <br />
          minji &copy; {new Date().getFullYear()} &nbsp; All rights reserved
        </div>
      </footer>
    </>
  );
};

export default Footer;

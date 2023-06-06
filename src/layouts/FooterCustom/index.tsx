import {Layout} from "antd";
import "./footer.scss";

const {Footer} = Layout;

const FooterCustom = () => {
  return (
    <Footer className="footer-at-the-bottom">
      © 2021 Bluebik Group. All Rights Reserved.
    </Footer>
  )
}

export default FooterCustom;

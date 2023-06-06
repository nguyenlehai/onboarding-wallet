import {Image, Layout} from "antd";
import IMAGES_CUSTOM from "@assets/images";
import "./header.scss";

const {Header} = Layout;

const HeaderCustom = () => {
  return (
    <Header className="header-custom">
      <Image src={IMAGES_CUSTOM.bluebikLogo} preview={false} style={{width: "35%"}}></Image>
    </Header>
  )
}

export default HeaderCustom;

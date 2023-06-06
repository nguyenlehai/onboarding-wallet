import {useRef, useState} from "react";
import {Button, Layout, Steps} from "antd";
import "./home-page.scss";
import DataStepOne from "@components/DataStepOne";
import DataStepTwo from "@components/DataStepTwo";
import DataStepThree from "@components/DataStepThree";
import HeaderCustom from "@layouts/HeaderCustom";
import FooterCustom from "@layouts/FooterCustom";
import {useDocumentTitle} from "@hooks/useDocumentTitle";
import SuccessWallet from "@components/SuccessWallet";
import {STATUS_WALLET} from "@utilities/constant";

const {Content} = Layout;

const HomePage = () => {
  useDocumentTitle("Bluebik | E-wallet onboarding");
  const success = localStorage.getItem("status");
  const [walletDone, setWalletDone] = useState<boolean>(success === STATUS_WALLET.SUCCESS);
  const [current, setCurrent] = useState(0);
  const stepOneRef = useRef<any>();
  const stepTwoRef = useRef<any>();

  const steps = [
    {
      title: "Basic Information",
      content: <DataStepOne ref={stepOneRef}/>,
    },
    {
      title: "Additional Information",
      content: <DataStepTwo ref={stepTwoRef}/>,
    },
    {
      title: "Purpose",
      content: <DataStepThree/>,
    },
  ];
  const items = steps.map((item) => ({key: item.title, title: item.title}));

  const handleDone = () => {
    localStorage.setItem("status", STATUS_WALLET.SUCCESS);
    setWalletDone(true);
  };

  const handleNextTab = () => {
    switch (current) {
      case 0:
        // eslint-disable-next-line no-case-declarations
        const checkFullName = stepOneRef?.current?.onFinish();
        if (checkFullName) {
          setCurrent(current + 1);
        }
        break;
      case 1:
        stepTwoRef?.current?.onFinish();
        setCurrent(current + 1);
        break;
      case 2:
        setCurrent(current + 1);
    }
  };

  const changeWallet = () => {
    localStorage.setItem("status", STATUS_WALLET.UN_SUCCESS);
    setWalletDone(false);
    setCurrent(0);
  };

  return (
    <div>
      {/*HeaderCustom*/}
      <HeaderCustom/>

      {/*Content*/}
      <Content className="content-custom">
        {!walletDone && (
          <>
            <h2>Welcome to onboarding of Bluebik E-wallet </h2>
            <Steps current={current} items={items}/>
            <div className="content-style">{steps[current].content}</div>

            {/*Handle button Next/Previous*/}
            <div style={{marginTop: 24}}>
              {current > 0 && (
                <Button
                  style={{margin: "0 8px"}}
                  onClick={() => setCurrent(current - 1)}
                >
                  Previous
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleNextTab}
                >
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={handleDone}>
                  Done
                </Button>
              )}
            </div>
          </>
        )}

        {walletDone && <SuccessWallet changeWallet={changeWallet}/>}
      </Content>

      {/*FooterCustom*/}
      <FooterCustom/>
    </div>
  );
};

export default HomePage;

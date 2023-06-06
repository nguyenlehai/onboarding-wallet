import {Form, Input} from "antd";
import React, {useEffect, useState} from "react";

// eslint-disable-next-line react/display-name
const DataStepOne = React.forwardRef((props: any, ref: any) => {
  const [form] = Form.useForm();
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") ?? "",
  );
  const [idNumber, setIdNumber] = useState(
    localStorage.getItem("idNumber") ?? "",
  );
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      idNumber: localStorage.getItem("idNumber"),
    });
  }, []);

  const onFinish = () => {
    if (fullName === "") {
      setValidate(true);
      return false;
    } else {
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("idNumber", String(idNumber));
      setValidate(false);
      return true;
    }
  };

  React.useImperativeHandle(ref, () => ({
    onFinish,
  }));

  return (
    <>
      <p>Basic Information</p>
      <Form
        form={form}
        name="basic-information"
        style={{padding: "0 24px 1px 24px"}}
        onFinish={onFinish}
      >
        {/*Full Name*/}
        <Form.Item
          label={
            <div>
              <span style={{color: "red"}}>* </span>Full Name
            </div>
          }
          rules={[{required: true}]}
        >
          <div>
            <Input
              maxLength={128}
              size="large"
              placeholder="Your full name"
              style={{width: "50%"}}
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            {validate && (
              <div style={{color: "red"}}>Full name is require!</div>
            )}
          </div>
        </Form.Item>

        {/*ID Number*/}
        <Form.Item
          name="idNumber"
          label="ID Number"
          rules={[
            {
              pattern: /^\d{0,50}$/,
              message: "Value should be less than 50 character",
            },
          ]}
        >
          <Input
            value={idNumber}
            maxLength={50}
            size="large"
            placeholder="Your ID Number"
            style={{width: "50%"}}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(event) => setIdNumber(event.target.value)}
          />
        </Form.Item>
      </Form>
    </>
  );
});

export default DataStepOne;

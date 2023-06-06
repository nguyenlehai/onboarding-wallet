import React, {useEffect, useState} from "react";
import {DatePicker, Form, Input} from "antd";
import {DATE_FORMAT} from "@utilities/constant";
import moment from "moment";

// eslint-disable-next-line react/display-name
const DataStepTwo = React.forwardRef((props: any, ref: any) => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState(localStorage.getItem("email") ?? "");
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber") ?? "",
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    localStorage.getItem("dateOfBirth") ?? "",
  );
  useEffect(() => {
    form.setFieldsValue({
      email: localStorage.getItem("email"),
      phoneNumber: localStorage.getItem("phoneNumber"),
      dateOfBirth: localStorage.getItem("dateOfBirth")
        ? moment(localStorage.getItem("dateOfBirth"), DATE_FORMAT)
        : null,
    });
  }, []);

  const onFinish = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("dateOfBirth", dateOfBirth);
  };

  React.useImperativeHandle(ref, () => ({
    onFinish,
  }));

  return (
    <>
      <p>Additional Information</p>
      <Form
        form={form}
        name="basic-information"
        style={{padding: "0 24px 1px 24px"}}
        onFinish={onFinish}
      >
        {/*Email*/}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input
            value={email}
            size="large"
            placeholder="Your email"
            style={{width: "50%"}}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Item>

        {/*Phone Number*/}
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              pattern: /^\+?\d{4,15}$/,
              message: "Phone number not correct",
            },
          ]}
        >
          <Input
            value={phoneNumber}
            size="large"
            placeholder="Your Phone Number"
            style={{width: "50%"}}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Form.Item>

        {/*Date Of Birth*/}
        <Form.Item name="dateOfBirth" label="Date Of Birth">
          <DatePicker
            format={DATE_FORMAT}
            style={{width: "50%"}}
            size="large"
            onChange={(date: any) =>
              setDateOfBirth(date ? moment(date).format(DATE_FORMAT) : "")
            }
          />
        </Form.Item>
      </Form>
    </>
  );
});

export default DataStepTwo;

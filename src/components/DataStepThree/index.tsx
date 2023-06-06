import {Select} from "antd";
import {useState} from "react";

const DataStepThree = () => {
  const {Option} = Select;
  const storedData = localStorage.getItem("targetData");
  const initialData = storedData ? JSON.parse(storedData) : [];
  const [data, setData] = useState(initialData);

  const targetData = [
    "Money transfer",
    "Payment",
    "Bill payment",
    "Loan",
    "Investment",
    "Saving",
  ];

  const handleChange = (e: any) => {
    localStorage.setItem("targetData", JSON.stringify(e));
    setData(e);
  };

  return (
    <div style={{padding: "5% 10% 5% 10%"}}>
      <Select
        mode="multiple"
        allowClear
        style={{width: "100%"}}
        placeholder="Please select"
        onChange={handleChange}
        optionFilterProp="children"
        value={data}
      >
        {targetData.map((item: any, index: any) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default DataStepThree;

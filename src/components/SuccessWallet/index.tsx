import {Button, Result, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {NOT_AVAILABLE} from "@utilities/constant";

interface DataType {
  key: React.Key;
  fullName: string;
  idNumber: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  targetData: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Full Name',
    dataIndex: 'fullName',
  },
  {
    title: 'ID Number',
    dataIndex: 'idNumber',
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
  },
  {
    title: 'Purposes',
    dataIndex: 'targetData',
  },
];

const data: DataType[] = [
  {
    key: "1",
    fullName: localStorage.getItem("fullName") || NOT_AVAILABLE,
    idNumber: localStorage.getItem("idNumber") || NOT_AVAILABLE,
    email: localStorage.getItem("email") || NOT_AVAILABLE,
    phoneNumber: localStorage.getItem("phoneNumber") || NOT_AVAILABLE,
    dateOfBirth: localStorage.getItem("dateOfBirth") || NOT_AVAILABLE,
    targetData: localStorage.getItem("targetData") || NOT_AVAILABLE,
  },
];


const SuccessWallet = ({changeWallet}: any) => {
  return (
    <div style={{paddingTop: "5%"}}>
      <Result
        status="success"
        title="Successful onboarding"
      />
      <div>
        <p><b>Your Information:</b></p>
        <Table columns={columns} dataSource={data} size="middle" pagination={false} scroll={{x: true}}/>
        <div style={{paddingTop: "20px"}}>
          <Button type="primary" key="console" onClick={changeWallet}>
            Edit Your Data?
          </Button>
        </div>
      </div>
    </div>
  )
};

export default SuccessWallet;

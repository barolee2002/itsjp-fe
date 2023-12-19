import React from "react";
import { Row, Col, Input, DatePicker, InputNumber, AutoComplete } from "antd";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { incomes, pays } from "../../utils/interface/interface";
import { ErrorMessage } from "../../components/ErrorMessage";
import { changeDateFormat } from "../../utils/dateFormat";

interface Props {
  detail: pays | incomes;
  setDetail: (prev: any) => void;
  categories: string[];
}

const setListCategory = (categories : string[]) => {
    return categories?.map((category) => {
      return {
        value: category,
      };
    });
};
export function Detail({ detail, setDetail, categories }: Props) {
  const [checkValidNumber, setCheckNumer] = React.useState(true);
  const handleSetDate = (date: Dayjs | null, dateString: string) => {
    setDetail((prev: any) => {
      return {
        ...prev,
        time: changeDateFormat(dateString),
      };
    });
  };

  return (
    <Row className="content">
      <Row gutter={[72, 0]} className="full-width">
        <Col span={12} className="input-box">
          <p className="input-title">名前</p>
          <Input
            className="input-content"
            placeholder="給料"
            onChange={(e) => {
              setDetail((prev: any) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
            value={detail.name ? detail.name : undefined}
          />
        </Col>
        <Col span={12} className="input-box">
          <p className="input-title">額</p>
          <InputNumber
            className="input-content"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            prefix={<p className="prefix">¥ </p>}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            value={detail.amount ? detail.amount.toString() : undefined}
            onChange={(value: string | null) => {
              if (value !== null) {
                parseInt(value) < 0
                  ? setCheckNumer(false)
                  : setCheckNumer(true);

                setDetail((prev: any) => {
                  return {
                    ...prev,
                    amount: parseInt(value),
                  };
                });
              }
            }}
            //   }}
            onFocus={() => setCheckNumer(true)}
          />
          {!checkValidNumber && (
            <ErrorMessage errorText="数値を負にすることはできません" />
          )}
        </Col>
        <Col span={12} className="input-box">
          <p className="input-title">時間</p>
          <DatePicker
            className="input-content"
            onChange={(date, dateString) => {
              handleSetDate(date, dateString);
            }}
            placeholder="22/2/2022"
            value={detail.time ? dayjs(detail.time) : undefined}
            format="DD/MM/YYYY" // Set the desired format here
          />
        </Col>
        <Col span={12} className="input-box">
          <p className="input-title">カテゴリー</p>
          <AutoComplete
            className="input-selection"
            options={setListCategory(categories)}
            placeholder="try to type `b`"
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onChange={(e) => {
              setDetail((prev: any) => {
                return {
                  ...prev,
                  category: e,
                };
              });
            }}
            value={detail.category ? detail.category : undefined}
          />
        </Col>
      </Row>
    </Row>
  );
}

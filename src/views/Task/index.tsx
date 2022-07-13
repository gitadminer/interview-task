import Input from "../../components/Input";
import styled from "styled-components";
import { getRate } from "../../apis/task";
import React, { useEffect, useState } from "react";
import RateView from "./components/RateView";
import TaskItem from "./components/TaskItem";
import { reChangeProps, TaskListProps, ListTotal, RateList } from "../../interfaces/task";
import { selectOptions } from "../../utils/constants";
import { similar } from "../../utils/comparison";

const MemoTaskItem = React.memo(TaskItem);
const AppComponent = styled.div`
  width: 1024px;
  margin: 20px auto 0;
`;

const TaskForm = styled.div`
  margin-bottom: 12px;
`;

const TaskButton = styled.button`
  width: 80px;
  height: 28px;
  margin-left: 12px;
`;

function calc(list: TaskListProps[]) {
  const totals: ListTotal[] = JSON.parse(JSON.stringify(selectOptions));
  list.forEach((item) => {
    totals.forEach((target) => {
      // 从二维数组中把参数取出
      const find = item.ratesList.find(i => i.key === target.type);
      if(find) {
        const perT = +target.total || 0;
        const curT = +find.value || 0;
        target.total = curT + perT;
      }
    });
  });
  return totals;
}

function App() {
  // 表单默认值
  const [values] = useState({ price: "", name: "", type: "USD" });
  // 计划列表
  const [preList, setPreList] = useState<TaskListProps[]>([]);
  // 完成列表
  const [complete, setComplete] = useState<TaskListProps[]>([]);
  const [exchangeRate, setExchangeRate] = useState({ base: "USD", rates: {} });
  // 总数结算
  const [preTotals, setPreTotal] = useState<ListTotal[]>([]);
  const [completeTotal, setCompleteTotal] = useState<ListTotal[]>([]);
  // 相似度变量
  const similarValue = 0.6;
  // 添加至计划
  const addToPreTask = () => {
    if (+values.price && values.name) {
      const ratesList: RateList[] = [];
      for (let key in exchangeRate.rates) {
        const curRate: any = exchangeRate.rates;
        ratesList.push({
          key,
          value: +(curRate[key] * +values.price).toFixed(5),
        });
      }
      let list: TaskListProps = {
        ...values,
        checked: false,
        listkey: Date.now(),
        ratesList: ratesList,
      };
      const newData = [...preList, list];
      setPreList(newData);
      setPreTotal(calc(newData));
      // 检测已完成列表中是否有相似项
      let hasSimlar = false;
      complete.forEach((val) => {
        if (similar(list.name, val.name, 2) >= similarValue) {
          val.checked = true;
          hasSimlar = true;
        }
      });
      if (hasSimlar) setComplete([...complete]);
    } else {
      alert("内容错误？没填写完整");
    }
  };
  // 更新显示汇率
  const reExchangeRate = (props: reChangeProps) => {
    getRateData(props.value);
  };

  // 保存已经完成列表
  const saveCompleteTask = (task: TaskListProps) => {
    // 移除
    const newPreList = preList.filter((val) => val.listkey !== task.listkey);
    const newComplete = [task, ...complete];
    setPreList(newPreList);
    setComplete(newComplete);
    setPreTotal(calc(newPreList));
    setCompleteTotal(calc(newComplete));
  };
  // 获取汇率数据
  const getRateData = (type: string) => {
    getRate(type).then((data: any) => {
      setExchangeRate({
        base: data.base,
        rates: data.rates,
      });
    });
  };

  useEffect(() => {
    getRateData("USD");
  }, []);

  return (
    <AppComponent>
      {/* 表单 */}
      <TaskForm>
        <Input
          type="input"
          placeholder="任务"
          values={values}
          label="name"
        ></Input>
        <Input
          type="input"
          placeholder="价格"
          values={values}
          label="price"
        ></Input>
        <Input
          type="select"
          placeholder="货币类型"
          values={values}
          label="type"
          options={selectOptions}
          onchange={reExchangeRate}
        ></Input>
        <TaskButton onClick={addToPreTask}>添加</TaskButton>
      </TaskForm>
      {/* 汇率 */}
      <RateView base={exchangeRate.base} rates={exchangeRate.rates}></RateView>
      {/* 计划列表 */}
      <MemoTaskItem
        list={preList}
        listName="计划单"
        totals={preTotals}
        cb={saveCompleteTask}
      ></MemoTaskItem>

      {/* 完成列表 */}
      <MemoTaskItem
        list={complete}
        listName="已完成"
        totals={completeTotal}
      ></MemoTaskItem>
    </AppComponent>
  );
}

export default App;

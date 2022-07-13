import styled from "styled-components";
import { TaskListProps, ListTotal } from "../../../interfaces/task";

const Lists = styled.div`
   border: 1px solid #ccc;
   margin-top: 24px;
   padding: 12px;
  .task-item,
  .total-details {
    display: flex;
    height: 28px;
    line-height: 28px;
    &:hover {
      background: #ccc;
      cursor: pointer;
    }
  }
  .task-name {
    width: 220px;
  }
  .task-item + .task-item {
    border-top: 1px solid #dcdcdc;
    margin: 4px 0;
  }
  .rate-to-price {
    margin-left: 8px;
  }
  .task-header {
    font-size: 18px;
    margin: 0px 0 16px;
  }
  .total-details {
    margin-top: 12px;
  }
  .del {
    text-decoration: line-through;
  }
`;

interface TaskItemProps {
  list: TaskListProps[];
  cb?: (target: TaskListProps) => void;
  listName?: string;
  totals?: ListTotal[];
}

const TaskItem = (props: TaskItemProps) => {
  const { list, listName, cb, totals } = props;
  const adToComplete = (target: TaskListProps) => {
    if (cb && window.confirm("计划已经完成?添加至完成列表")) {
      cb(target);
    }
  };
  return (
    <Lists>
      <div className="task-header">{listName}</div>
      {list.map((val) => (
        <div
          className="task-item"
          key={val.listkey}
          onClick={() => adToComplete(val)}
        >
          <div className="task-checkbox">
            <input readOnly={true} checked={val.checked} type="checkbox" />
          </div>
          <div className={(val.checked ? "del" : "") + " task-name"}>
            {val.name}
          </div>
          {/* 按货币排序渲染 */}
          {val.ratesList.map(op => (
            <div className="rate-to-price" key={op.key}>
              {op.key}: {op.value || "-"}
            </div>
          ))}
        </div>
      ))}
      {!list.length && <div>-</div>}
      {/* 合计 */}
      <div className="total-details">
        <div>合计：</div>
        {(totals || []).map((op) => (
          <div className="rate-to-price" key={op.type}>
            {op.type}: {op.total || "-"}
          </div>
        ))}
      </div>
    </Lists>
  );
};

export default TaskItem;

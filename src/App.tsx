import { useState } from 'react'
import './App.css'
import StepsForm from './components/StepsForm'
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function compare(a: {steps:number,date:Date}, b: {steps:number,date:Date}) {
  var dateA = a.date;
  var dateB = b.date;
 
  if (dateB.getTime() == dateA.getTime()) return 0;
  else {
    if (dateB.getTime() > dateA.getTime()) return -1; 
    else return 1;
  }
}

function App() {
  const [state,setState] = useState<{steps:number,date:Date}[]>([]);

  const handleSubmit = (newRow: {steps: number,date: Date}) => {
    let rowToEdit = state.find(item => item.date == newRow.date);
    if (typeof rowToEdit === "undefined") {
      setState((prevState) => prevState.concat([newRow]));
    } else {
      const newState = state.map((currentRow) => (
        currentRow.date == newRow.date 
          ? { ...currentRow, steps: (rowToEdit.steps + newRow.steps)}
          : currentRow
      ));
      setState(newState);
    }
  }

  const handleDelete = (deletedIndex: number) => {
    let currentState = state;
    setState(currentState.filter((value,index) => index != deletedIndex ));
  }

  const TableRows = () => {
    return (<tbody>
      {state.sort(compare).map((item,index) => 
      <tr key={index}>
        <td>
          {`${item.date.getDate()}-${item.date.getMonth()+1}-${item.date.getFullYear()}`}
        </td>
        <td>
          {item.steps}
        </td>
        <td>
        <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(index)}/>
        </td>
      </tr>
      )}
    </tbody>)
    }

  return (
    <>
    <StepsForm onSubmit={handleSubmit}/>
    <table>
      <thead>
      <tr>
        <th>Дата</th>
        <th>Пройдено км</th>
        <th>Действия</th>
      </tr>
      </thead>
      <TableRows/>
    </table>
    </>
  )
}

export default App

import { useState } from "react";

type FormProps = {
    onSubmit: (newRow:{steps:number,date:Date}) => void
}
 
const StepsForm = (props: FormProps) => {
    const [state,setState] = useState<{steps:number,date:Date}>({steps:0,date:new Date()});
    
    const handleDateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target;
        setState(prevState => ({...prevState, date: new Date(value)}));
     } 

     const handleStepsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target;
        setState(prevState => ({...prevState,steps:+value}))
     }

    return (
    <form onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        props.onSubmit(state);
    }}>
        <label htmlFor="date">
            Дата
            <input type='date' id='date' name='date' onChange={handleDateChanged}/>
        </label>
        <label htmlFor="km">
            Пройдено, км
            <input type='text' id='km' name='km' value={state?.steps} onChange={handleStepsChanged}/>
        </label>
        <input type="submit" value="OK"/>
</form>
)
}

export default StepsForm
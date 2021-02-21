import React, {useState, useRef} from 'react';

interface TodoFormProps {
    onAdd(title: string): void
}

export const TodoForm: React.FC<TodoFormProps> = props => {
    const [title, setTitle] = useState<string>("");

    const ref = useRef<HTMLInputElement>(null);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    };

    const keyHandler = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            props.onAdd(ref.current!.value);//для примера используем ref
            setTitle("");
            event.preventDefault();
        }
    };

    return (
        <>
            <div className="input-field">
                <input ref={ref} type="text" id="title" value={title} onChange={changeHandler} onKeyPress={keyHandler}/>
                <label htmlFor="title">Введите название дела</label>
            </div>
        </>
    )
};


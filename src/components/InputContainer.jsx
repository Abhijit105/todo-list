import { useState } from "react";
import Button from "../common/Button";
import ButtonsGroup from "../common/ButtonsGroup";
import Container from "../common/Container";
import Input from "../common/Input";
import { useSession, useTodo } from "../store/store";
import { createDocument } from "../appwrite/appwrite";
import Snackbar from "./Snackbar";

function InputContainer() {
    const [todoText, setTodoText] = useState('')
    const [showSnackbar, setShowSnackbar] = useState(false)

    const addTodo = useTodo(state => state.addTodo)
    const session = useSession(state => state.session)
    const todos = useTodo(state => state.todos)

    const onTodoInputChange = function (event) {
        setTodoText(event.target.value)
    }

    const closeSnackbar = function()    {
        setShowSnackbar(false)
    }

    const onAddTodo = async function (newTodoText) {
        if (todos.length === 8) {
            setShowSnackbar(true)
            return
        }
        if(!todoText.trim())    {
            return
        }
        const newTodo = {
            todo: newTodoText,
            completed: false,
            userId: session.$id
        }
        addTodo(newTodo)
        await createDocument(newTodo)
        setTodoText('')
    }

    const clear = function () {
        setTodoText('')
    }

    return (
        <Container cx={'todo-input-container'}>
            <Input cx={'todo-input'} placeholder={'Enter todo here...'} type={'text'} value={todoText} onChange={onTodoInputChange} />
            <ButtonsGroup buttons={[(<Button cx={'button'} title={'Add'} onClick={() => onAddTodo(todoText)} key={0} />),
            (<Button cx={'button'} title={'Clear'} onClick={clear} key={1} />)]} />
            {showSnackbar && <Snackbar title={'max of 8 todos allowed'} onClose={closeSnackbar} />}
        </Container>
    )
}

export default InputContainer
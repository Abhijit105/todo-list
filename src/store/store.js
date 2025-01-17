import { create } from "zustand";

export const useTodo = create((set) => ({
    todos: [],
    setTodos: (selectedTodos) => set({todos: selectedTodos}),
    addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
    removeTodo: (selectedDocumentId) => set((state) => ({ todos: state.todos.filter((todo) => todo.$id !== selectedDocumentId) })),
    toggleTodo: (selectedDocumentId) => set((state) => ({ todos: state.todos.map((todo) => todo.$id === selectedDocumentId ? { ...todo, completed: !todo.completed } : todo) })),
    updateTodo: (selectedDocumentId, updatedTodo) => set((state) => ({todos: state.todos.map((todo) => todo.$id === selectedDocumentId ? {...todo, ...updatedTodo} : todo)}))
}))

export const useSnackbar = create((set) => ({
    isShowSnackbar: false,
    showSnackbar: () => set({ isShowSnackbar: true }),
    hideSnackbar: () => set({ isShowSnackbar: false })
}))

export const useSession = create((set) => ({
    session: null,
    setSession: (newSession) => set({ session: newSession }),
    unsetSession: () => set({ session: null })
}))

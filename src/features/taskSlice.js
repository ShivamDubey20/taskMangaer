import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';


const intialState = {
    tasks: [],
    loading : false,
    error: null,
    status :'All'
}

export const fetchTodo = createAsyncThunk('task/fetchTodo', async () => {

    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=7');
    const data = await response.json();
    return data.map((item) => {
        return {
            id: item.id,
            title: item.title,
            description: '',
            status: item.completed ? "Completed" : "Pending"
        }
    });
})

const taskSlice = createSlice({
    name: 'task',
    initialState: intialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            state.tasks[index] = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending , (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchTodo.fulfilled , (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        }).addCase(fetchTodo.rejected , (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
    
}); 

export const {addTask, deleteTask, updateTask, setStatus} = taskSlice.actions;
export default taskSlice.reducer;
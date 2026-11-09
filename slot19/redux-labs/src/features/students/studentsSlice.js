import {
  createSlice,
  createAsyncThunk,
  createSelector,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { studentApi } from '../../api/studentApi';

// Lấy message lỗi chung
const errMsg = (err) =>
  err.response?.data?.message || err.message || 'Có lỗi xảy ra';

// ================= THUNKS =================
export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await studentApi.getAll();
    } catch (err) {
      return rejectWithValue(errMsg(err));
    }
  }
);

export const addStudent = createAsyncThunk(
  'students/add',
  async (student, { getState, rejectWithValue }) => {
    // Validate trùng mã SV bằng getState
    const exists = getState().students.items.some(
      (s) => s.code.toLowerCase() === student.code.toLowerCase()
    );
    if (exists) return rejectWithValue(`Mã sinh viên ${student.code} đã tồn tại`);
    try {
      return await studentApi.create(student);
    } catch (err) {
      return rejectWithValue(errMsg(err));
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      return await studentApi.update(id, { id, ...data });
    } catch (err) {
      return rejectWithValue(errMsg(err));
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await studentApi.remove(id); // trả về id đã xóa
    } catch (err) {
      return rejectWithValue(errMsg(err));
    }
  }
);

// ================= SLICE =================
const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    saving: false, // đang thêm / sửa / xóa
    error: null,
    keyword: '',
    sortBy: 'code', // 'code' | 'name' | 'gpa'
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- FETCH -----
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // ----- ADD -----
      .addCase(addStudent.fulfilled, (state, action) => {
        state.saving = false;
        state.items.push(action.payload);
      })
      // ----- UPDATE -----
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.saving = false;
        const idx = state.items.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      // ----- DELETE -----
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.saving = false;
        state.items = state.items.filter((s) => s.id !== action.payload);
      })
      // ----- MATCHER: gom xử lý chung cho add/update/delete -----
      .addMatcher(
        isPending(addStudent, updateStudent, deleteStudent),
        (state) => {
          state.saving = true;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(addStudent, updateStudent, deleteStudent),
        (state, action) => {
          state.saving = false;
          state.error = action.payload ?? action.error.message;
        }
      );
  },
});

export const { setKeyword, setSortBy, clearError } = studentsSlice.actions;
export default studentsSlice.reducer;

// ================= SELECTORS =================
export const selectStudentsState = (state) => state.students;
const selectItems = (state) => state.students.items;
const selectKeyword = (state) => state.students.keyword;
const selectSortBy = (state) => state.students.sortBy;

export const selectVisibleStudents = createSelector(
  [selectItems, selectKeyword, selectSortBy],
  (items, keyword, sortBy) => {
    const kw = keyword.trim().toLowerCase();
    const filtered = kw
      ? items.filter(
          (s) =>
            s.name.toLowerCase().includes(kw) ||
            s.code.toLowerCase().includes(kw)
        )
      : items;
    return [...filtered].sort((a, b) =>
      sortBy === 'gpa'
        ? b.gpa - a.gpa
        : String(a[sortBy]).localeCompare(String(b[sortBy]), 'vi')
    );
  }
);

export const selectAverageGpa = createSelector([selectItems], (items) =>
  items.length
    ? (items.reduce((s, x) => s + Number(x.gpa), 0) / items.length).toFixed(2)
    : '0.00'
);

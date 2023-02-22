import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash.clonedeep";
import { Arrangement, ArrangementFlower } from "../../types/Types";
import { patchArrangement, postArrangement } from "./arrangementDetailsApi";

export interface ArrangementDetailsState {
  value: Arrangement;
  status: "loading" | "idle" | "failed";
}

export const initialState: ArrangementDetailsState = {
  value: {
    id: -1,
    name: "",
    vesselType: "",
    vesselCount: 0,
    vesselCost: 0,
    foamCount: 0,
    cardHolder: false,
    venmo: false,
    paypal: false,
    done: false,
    json: "",
    flowers: [],
    hardGoods: [],
  },
  status: "idle",
};

export const updateArrangementAsync = createAsyncThunk<Arrangement, Arrangement>(
  "arrangement/patchArrangement",
  async (s) => await patchArrangement(s)
);
export const createArrangementAsync = createAsyncThunk<Arrangement, Arrangement>(
  "arrangement/postArrangement",
  async (s) => await postArrangement(s)
);

export const arrangementDetailsSlice = createSlice({
  name: "arrangementDetails",
  initialState,
  reducers: {
    addNewFlower: (state, action: PayloadAction<string>) => {
      state.value.flowers.push({
        id: (state.value.flowers.length + 1) * -1,
        name: "",
        count: 1,
        pricePerStem: 0,
        category: action.payload,
      });
    },
    setArrangement: (state, action: PayloadAction<Arrangement>) => {
      state.value = cloneDeep(action.payload);
    },
    updateFlower: (state, action: PayloadAction<{ old: ArrangementFlower; new: ArrangementFlower }>) => {
      const theFlower = state.value.flowers.find((f) => f.id === action.payload.old.id);
      if (theFlower) {
        theFlower.count = action.payload.new.count;
        theFlower.name = action.payload.new.name;
        theFlower.id = action.payload.new.id;
        theFlower.pricePerStem = action.payload.new.pricePerStem;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateArrangementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateArrangementAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateArrangementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(createArrangementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createArrangementAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createArrangementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const { addNewFlower, setArrangement, updateFlower } = arrangementDetailsSlice.actions;

export const resetArrangementDetails = (dispatch: Dispatch) => {
  dispatch(setArrangement(initialState.value));
};
export default arrangementDetailsSlice.reducer;

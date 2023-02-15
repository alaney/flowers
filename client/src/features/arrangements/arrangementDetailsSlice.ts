import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash.clonedeep";
import { Arrangement, ArrangementFlower } from "../../types/Types";

export interface ArrangementDetailsState {
  value: Arrangement;
}

const initialState: ArrangementDetailsState = {
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
};

export const arrangementDetailsSlice = createSlice({
  name: "counter",
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
});

export const { addNewFlower, setArrangement, updateFlower } = arrangementDetailsSlice.actions;

export const resetArrangementDetails = (dispatch: Dispatch) => {
  dispatch(setArrangement(initialState.value));
};
export default arrangementDetailsSlice.reducer;

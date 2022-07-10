import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name:'appointment',
  initialState: {
    appointments: [],
    name: "",
    startTime: 0,
    endTime: 0,
    description: "",
    changed: false
  },
  reducers: {

    replaceAppointment(state,action){
      state.name = action.payload.name;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
      state.description = action.payload.description;
    },
    // addItemToCart(state, action) {
    //   const newItem = action.payload;
    //   const existingAppointment = state.items.find((appointment) => appointment.id === newItem.id);
    //   state.totalQuantity++;
    //   state.changed = true;
    //   if (!existingAppointment) {
    //     state.items.push({
    //       id: newItem.id,
    //       price: newItem.price,
    //       quantity: 1,
    //       totalPrice: newItem.price,
    //       name: newItem.title
    //     });
    //   } else {
    //       existingAppointment.quantity++;
    //       existingAppointment.totalPrice = existingAppointment.totalPrice + newItem.price;
    //   }
    // },
    // removeAppointment(state, action) {
    //     const id = action.payload;
    //     const existingAppointment = state.appointments.find(appointment => appointment.id === id);
    //     state.changed = true;
    //     if(existingAppointment.quantity === 1){
    //         state.items = state.items.filter(appointment => appointment.id !== id);
    //     }else{
    //         existingAppointment.quantity--;
    //         existingAppointment.totalPrice = existingAppointment.totalPrice - existingAppointment.price;
    //     }
    // },
  },
});


export const appointmentActions = appointmentSlice.actions;

export default appointmentSlice;
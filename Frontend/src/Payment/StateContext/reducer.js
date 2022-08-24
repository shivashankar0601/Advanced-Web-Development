const initialState = {
  formValues: {
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: null,
    nameoncard: "",
    cardnumber: "",
    expdate: "",
    cvv: "",
    amount: 0,
    currency: null,
    email: "",
  },
  product: {
    sellerId: "",
    buyerId: "",
    id: "",
    name: "",
    desc: "",
    price: "",
    sellerName: ""
  },
  status: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "editFormValue":
      state.formValues[action.key.toLowerCase()] = action.value;
      return { ...state };
    case "emptyFormValue":
      return {
        ...state,
        formValues: initialState.formValues,
      };
    case "addProduct":
        state.product = action.value;
        return {...state};
    case "setPaymentStatus":
        state.status = action.value;
        return {...state};
    default:
  }
  return state;
};

export { initialState, reducer };

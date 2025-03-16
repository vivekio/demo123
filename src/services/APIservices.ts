import axios from "axios";

const updateCartService = async (item) => {
    const body = { userId: 2, products: [{ id: item.id }] };
    await axios.put(`https://fakestoreapi.com/carts/2`, body)
}

const deleteCartProduct = async (item) => {
    await axios.delete(`https://fakestoreapi.com/carts/${item.id}`)
}


export { updateCartService, deleteCartProduct }
import Basket from "../../models/Beefstore/basket";

const Mutation = {
    createBasket: async (parent, args, { userId }, info) => {
        if (!userId) throw new Error("Please log in.");

        if (!args.basketname) {
            throw new Error("Please provide all required fields.");
        } 

        const basket = await Basket.create({
            ...args,
        });

        return await Basket.findById(basket.id)
    }
}
export default Mutation
import Basket from "../../models/Beefstore/basket";
import Shelf from "../../models/Beefstore/shelf";

const Mutation = {
    createBasket: async (parent, args, { userId }, info) => {
        if (!userId) throw new Error("Please log in.");

        if (!args.basketname || !args.shelf) {
            throw new Error("Please provide all required fields.");
        } 

        const findshelf = await Shelf.findById(args.shelf)

        const basket = await Basket.create({
            basketname: args.basketname,
            shelf: findshelf
        });

        const shelf = await Shelf.findById(args.shelf);
        if(!shelf.basket){
            shelf.basket = [basket];
        } else {
            shelf.basket.push(basket);
        }
        await shelf.save();

        return await Basket.findById(basket.id)
        .populate({
            path: "shelf"
        })
    }
}
export default Mutation
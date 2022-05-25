import Basket from "../../models/Beefstore/basket";
import Beefroom from "../../models/Beefstore/beefroom";
import Shelf from "../../models/Beefstore/shelf";

const Mutation = {
    createBasket: async (parent, args, { userId }, info) => {
        if (!userId) throw new Error("Please log in.");

        if (!args.basketname || !args.shelf || !args.beefroom) {
            throw new Error("Please provide all required fields.");
        } 

        const findshelf = await Shelf.findById(args.shelf)

        const findroom = await Beefroom.findById(args.beefroom)

        const basket = await Basket.create({
            basketname: args.basketname,
            shelf: findshelf,
            beefroom: findroom
        });

        const shelf = await Shelf.findById(args.shelf);
        if(!shelf.basket){
            shelf.basket = [basket];
        } else {
            shelf.basket.push(basket);
        }
        await shelf.save();

        const room = await Beefroom.findById(args.beefroom);
        if(!room.basket){
            room.basket = [basket];
        } else {
            room.basket.push(basket);
        }
        await room.save();

        return await Basket.findById(basket.id)
        .populate({
            path: "shelf"
        })
        .populate({
            path: "beefroom"
        })
    }
}
export default Mutation
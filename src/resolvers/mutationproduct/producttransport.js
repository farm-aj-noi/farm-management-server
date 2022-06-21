import dayjs from "dayjs";
import Beefproduct from "../../models/Productstore/beefproduct";
import ProductTransport from "../../models/Productstore/producttransport";

const Mutation = {
  createProductTransport: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.name || !args.place || !args.barcode) {
      throw new Error("Please provide all required fields.");
    }

    const date = dayjs();

    const beefproduct = await Beefproduct.findOne({
      barcode: args.barcode,
    });
    
    if (beefproduct) {
      const transport = await ProductTransport.create({
        date: date,
        name: args.name,
        place: args.place,
        note: args.note,
        beefproduct: beefproduct.id,
      });
      /* console.log(beefproduct.id)
    return */
      const link = await Beefproduct.findById(beefproduct.id);
      if (!link.producttransport) {
        link.producttransport = [transport];
      } else {
        link.producttransport.push(transport);
      }
      await link.save();
      return ProductTransport.findById(transport.id);
    }
  },
};
export default Mutation;

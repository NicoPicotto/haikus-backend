import mongoose from "mongoose";
import HaikuBody from '../interfaces/haikuInterface';

const haikuSchema = new mongoose.Schema(
   {
      title: { type: String, required: true, unique: true },
      client: { type: String, required: true },
      project: { type: String, required: true },
      items: { type: Array, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
   },
   { versionKey: false, timestamps: true }
);

const Haiku = mongoose.model("Haiku", haikuSchema);

const getAllHaikus = async () => {
   try {
      const haikus = await Haiku.find();
      return haikus;
   } catch (error) {
      throw new Error("Error al obtener los presupuestos");
   }
};

const addHaiku = async (dataHaiku: HaikuBody) => {
   try {
      const newHaiku = new Haiku(dataHaiku);
      await newHaiku.save();
      return newHaiku;
   } catch (error) {
      throw new Error("Error al crear presupuesto");
   }
};

const deleteHaiku = async (id: string) => {
   try {
      const deletedHaiku = await Haiku.findByIdAndDelete(id);
      if (!deletedHaiku) {
         throw new Error("Presupuesto no encontrado");
      }
      return deletedHaiku;
   } catch (error) {
      throw new Error("Error al eliminar presupuesto");
   }
};

const updateHaiku = async (id: string, data: Partial<HaikuBody>) => {
   try {
      const updatedHaiku = await Haiku.findByIdAndUpdate(
         id,
         { $set: data },
         { new: true, runValidators: true }
      );
      if (!updatedHaiku) {
         throw new Error("Presupuesto no encontrado");
      }
      return updatedHaiku;
   } catch (error) {
      throw new Error("Error al actualizar el presupuesto");
   }
};

//Este es opcional pero funca
const getHaikuById = async (id: string) => {
   try {
      const haiku = await Haiku.findById(id);
      if (!haiku) {
         throw new Error("Presupuesto no encontrado");
      }
      return haiku;
   } catch (error) {
      throw new Error("Error al obtener el presupuesto");
   }
};

export default { getAllHaikus, addHaiku, deleteHaiku, updateHaiku, getHaikuById };

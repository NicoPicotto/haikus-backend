import mongoose from "mongoose";
import HaikuBody from "../interfaces/haikuInterface";

const haikuSchema = new mongoose.Schema(
   {
      text: { type: String, required: true },
      author: { type: Object, required: true },
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
      throw new Error("Error al obtener los haikus");
   }
};

const addHaiku = async (dataHaiku: HaikuBody) => {
   try {
      const newHaiku = new Haiku(dataHaiku);
      await newHaiku.save();
      return newHaiku;
   } catch (error) {
      throw new Error("Error al crear haiku");
   }
};

const deleteHaiku = async (id: string) => {
   try {
      const deletedHaiku = await Haiku.findByIdAndDelete(id);
      if (!deletedHaiku) {
         throw new Error("haiku no encontrado");
      }
      return deletedHaiku;
   } catch (error) {
      throw new Error("Error al eliminar haiku");
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
         throw new Error("haiku no encontrado");
      }
      return updatedHaiku;
   } catch (error) {
      throw new Error("Error al actualizar el haiku");
   }
};

//Este es opcional pero funca
const getHaikuById = async (id: string) => {
   try {
      const haiku = await Haiku.findById(id);
      if (!haiku) {
         throw new Error("haiku no encontrado");
      }
      return haiku;
   } catch (error) {
      throw new Error("Error al obtener el haiku");
   }
};

export default {
   getAllHaikus,
   addHaiku,
   deleteHaiku,
   updateHaiku,
   getHaikuById,
};

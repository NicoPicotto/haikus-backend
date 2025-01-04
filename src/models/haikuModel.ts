import mongoose from "mongoose";
import HaikuBody from "../interfaces/haikuInterface";

let cachedHaiku: any = null;
let lastUpdated: Date | null = null;

const haikuSchema = new mongoose.Schema(
   {
      text: { type: String, required: true },
      author: {
         id: { type: String, required: true },
         firstName: { type: String, required: true },
         lastName: { type: String, required: true },
         email: { type: String, required: true },
      },
      date: { type: Date, default: Date.now },
   },
   { versionKey: false, timestamps: true }
);

const Haiku = mongoose.model("Haiku", haikuSchema);

const getAllHaikus = async () => {
   try {
      const haikus = await Haiku.find().sort({ createdAt: -1 });
      return haikus;
   } catch (error) {
      throw new Error("Error al obtener los haikus");
   }
};

const addHaiku = async (dataHaiku: HaikuBody) => {
   try {
      const newHaiku = new Haiku(dataHaiku);
      await newHaiku.save(); // Aquí ocurre el problema
      return newHaiku;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error("Error al crear haiku");
      }
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

const getHaikusByUser = async (userId: string) => {
   return await Haiku.find({ "author.id": userId }).sort({ createdAt: -1 });
};

const getHaikuOfTheDay = async () => {
   const today = new Date().toISOString().split("T")[0];
   const todayDate = new Date(today);

   console.log("Fecha actual:", today);

   if (cachedHaiku && lastUpdated?.toISOString().split("T")[0] === today) {
      console.log("Devolviendo Haiku en caché:", cachedHaiku);
      return cachedHaiku;
   }

   try {
      const haikus = await Haiku.find(); // Asegúrate de que esto devuelve datos
      console.log("Haikus encontrados:", haikus);

      if (haikus.length === 0) {
         console.error("No hay Haikus disponibles.");
         throw new Error("No hay Haikus disponibles.");
      }

      const randomIndex = Math.floor(Math.random() * haikus.length);
      cachedHaiku = haikus[randomIndex];
      lastUpdated = todayDate;

      console.log("Haiku seleccionado:", cachedHaiku);
      return cachedHaiku;
   } catch (error) {
      console.error("Error en el modelo getHaikuOfTheDay:", error);
      throw new Error("Error al obtener el Haiku del día.");
   }
};

export default {
   getAllHaikus,
   addHaiku,
   deleteHaiku,
   updateHaiku,
   getHaikuById,
   getHaikusByUser,
   getHaikuOfTheDay,
};

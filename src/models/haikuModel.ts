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
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      savedBy: { type: [String], default: [] },
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

const toggleSaveHaiku = async (userId: string, haikuId: string) => {
   try {
      const User = mongoose.model("User"); // Modelo de usuario
      const user = await User.findById(userId);
      const haiku = await Haiku.findById(haikuId);

      if (!user || !haiku) {
         throw new Error("Usuario o Haiku no encontrado");
      }

      const isAlreadySaved = user.savedHaikus.includes(haikuId);

      if (isAlreadySaved) {
         // Eliminar el Haiku de la lista de guardados del usuario y del Haiku
         user.savedHaikus = user.savedHaikus.filter(
            (savedId: string) => savedId.toString() !== haikuId.toString()
         );
         haiku.savedBy = haiku.savedBy.filter(
            (savedUserId: string) =>
               savedUserId.toString() !== userId.toString()
         );
      } else {
         // Añadir el Haiku a la lista de guardados del usuario y del Haiku
         user.savedHaikus.push(haikuId);
         haiku.savedBy.push(userId);
      }

      // Guardar los cambios en ambos modelos
      await user.save(); // Asegúrate de guardar al usuario
      await haiku.save(); // Asegúrate de guardar el haiku

      return { isSaved: !isAlreadySaved };
   } catch (error) {
      console.error("Error en toggleSaveHaiku:", error);
      throw new Error("Error al guardar/desguardar el Haiku");
   }
};

const toggleLikeHaiku = async (haikuId: string, userId: string) => {
   try {
      const haiku = await Haiku.findById(haikuId);

      if (!haiku) {
         throw new Error("Haiku no encontrado");
      }

      // Convertir userId a ObjectId
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const alreadyLiked = haiku.likes.some((id) => id.equals(userObjectId));

      if (alreadyLiked) {
         // Eliminar el like
         haiku.likes = haiku.likes.filter((id) => !id.equals(userObjectId));
      } else {
         // Añadir el like
         haiku.likes.push(userObjectId);
      }

      await haiku.save();
      return { likesCount: haiku.likes.length, liked: !alreadyLiked };
   } catch (error) {
      console.error("Error en toggleLikeHaiku:", error);
      throw new Error("Error al actualizar el like del Haiku");
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
   toggleSaveHaiku,
   toggleLikeHaiku,
};

import mongoose from "mongoose";
import ClientBody from "../interfaces/clientInterface";

const clientSchema = new mongoose.Schema(
   {
      email: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      active: { type: Boolean, required: true },
   },
   { versionKey: false, timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

const getAllClients = async () => {
   try {
      const clients = await Client.find();
      return clients;
   } catch (error) {
      throw new Error("Error al obtener los clientes");
   }
};

const addClient = async (dataClient: ClientBody) => {
   try {
      const newClient = new Client(dataClient);
      await newClient.save();
      return newClient;
   } catch (error) {
      throw new Error("Error al crear cliente");
   }
};

const deleteClient = async (id: string) => {
   try {
      const deletedClient = await Client.findByIdAndDelete(id);
      if (!deletedClient) {
         throw new Error("Cliente no encontrado");
      }
      return deletedClient;
   } catch (error) {
      throw new Error("Error al eliminar cliente");
   }
};

const updateClient = async (id: string, data: Partial<ClientBody>) => {
   try {
      const updatedClient = await Client.findByIdAndUpdate(
         id,
         { $set: data },
         { new: true, runValidators: true }
      );
      if (!updatedClient) {
         throw new Error("Cliente no encontrado");
      }
      return updatedClient;
   } catch (error) {
      throw new Error("Error al actualizar el cliente");
   }
};

const getClientById = async (id: string) => {
   try {
      const client = await Client.findById(id);
      if (!client) {
         throw new Error("Cliente no encontrado");
      }
      return client;
   } catch (error) {
      throw new Error("Error al obtener el cliente");
   }
};

export default {
   getAllClients,
   addClient,
   deleteClient,
   updateClient,
   getClientById,
};

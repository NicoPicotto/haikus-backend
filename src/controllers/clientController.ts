import { Request, Response } from "express";
import Client from "../models/clientModel";
import ClientBody from "../interfaces/clientInterface";

const getAllClients = async (req: Request, res: Response) => {
   try {
      const clients = await Client.getAllClients();
      res.status(200).json(clients);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al obtener los clientes",
         error: error.message,
      });
   }
};

const addClient = async (req: Request, res: Response): Promise<void> => {
   const { name, email } = req.body;

   // Validar campos obligatorios
   if (!name || !email) {
      res.status(400).json({
         error: "Faltan datos obligatorios. Por favor, verificá todos los campos.",
      });
   }

   const clientBody: ClientBody = {
      name,
      email,
      active: true,
   };

   try {
      const newClient = await Client.addClient(clientBody);
      res.status(201).json(newClient);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al agregar el cliente",
         error: error.message,
      });
   }
};

const deleteClient = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const deletedClient = await Client.deleteClient(id);

      res.status(200).json({
         message: "Cliente eliminado con éxito",
         deletedClient,
      });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al eliminar el cliente",
         error: error.message,
      });
   }
};

const updateClient = async (req: Request, res: Response) => {
   const { id } = req.params;
   const data = req.body;

   if (data.length === 0) {
      return res.status(400).json({
         error: "No se proporcionaron campos válidos para actualizar.",
      });
   }

   try {
      const updatedClient = await Client.updateClient(id, data);
      if (!updatedClient) {
         return res.status(404).json({
            error: "Cliente no encontrado.",
         });
      }
      res.status(200).json({
         message: "Presupuesto actualizado con éxito",
         updatedClient,
      });
   } catch (error: any) {
      res.status(500).json({
         message: "Error al actualizar el cliente",
         error: error.message,
      });
   }
};

const getClientById = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const client = await Client.getClientById(id);
      res.status(200).json(client);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al obtener el cliente",
         error: error.message,
      });
   }
};

export { getAllClients, addClient, deleteClient, updateClient, getClientById };

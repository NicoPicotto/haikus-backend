import mongoose from "mongoose";
import BudgetBody from "../interfaces/budgetInterface";

const budgetSchema = new mongoose.Schema(
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

const Budget = mongoose.model("Budget", budgetSchema);

const getAllBudgets = async () => {
   try {
      const budgets = await Budget.find();
      return budgets;
   } catch (error) {
      throw new Error("Error al obtener los presupuestos");
   }
};

const addBudget = async (dataBudget: BudgetBody) => {
   try {
      const newBudget = new Budget(dataBudget);
      await newBudget.save();
      return newBudget;
   } catch (error) {
      throw new Error("Error al crear presupuesto");
   }
};

const deleteBudget = async (id: string) => {
   try {
      const deletedBudget = await Budget.findByIdAndDelete(id);
      if (!deletedBudget) {
         throw new Error("Presupuesto no encontrado");
      }
      return deletedBudget;
   } catch (error) {
      throw new Error("Error al eliminar presupuesto");
   }
};

const updateBudget = async (id: string, data: Partial<BudgetBody>) => {
   try {
      const updatedBudget = await Budget.findByIdAndUpdate(
         id,
         { $set: data },
         { new: true, runValidators: true }
      );
      if (!updatedBudget) {
         throw new Error("Presupuesto no encontrado");
      }
      return updatedBudget;
   } catch (error) {
      throw new Error("Error al actualizar el presupuesto");
   }
};

//Este es opcional pero funca
const getBudgetById = async (id: string) => {
   try {
      const budget = await Budget.findById(id);
      if (!budget) {
         throw new Error("Presupuesto no encontrado");
      }
      return budget;
   } catch (error) {
      throw new Error("Error al obtener el presupuesto");
   }
};

export default { getAllBudgets, addBudget, deleteBudget, updateBudget, getBudgetById };

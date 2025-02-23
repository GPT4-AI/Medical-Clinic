import { useState, useEffect } from "react";
import * as api from "../api";

export function useDatabase<T>(table: string, withDetails: boolean = false) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData();
  }, [table]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let result;

      if (withDetails) {
        switch (table) {
          case "appointments":
            result = await api.getAppointmentsWithDetails();
            break;
          case "consultations":
            result = await api.getConsultationsWithDetails();
            break;
          case "treatments":
            result = await api.getTreatmentsWithDetails();
            break;
          case "invoices":
            result = await api.getInvoicesWithDetails();
            break;
          case "payments":
            result = await api.getPaymentsWithDetails();
            break;
          case "schedules":
            result = await api.getSchedulesWithDetails();
            break;
          default:
            result = await api.getAll(table);
        }
      } else {
        result = await api.getAll(table);
      }

      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Partial<T>) => {
    try {
      await api.create(table, item);
      await fetchData();
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateItem = async (id: number, item: Partial<T>) => {
    try {
      await api.update(table, id, item);
      await fetchData();
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await api.remove(table, id);
      await fetchData();
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    data,
    loading,
    error,
    refresh: fetchData,
    addItem,
    updateItem,
    deleteItem,
  };
}

import { useState, useEffect } from "react";
import * as idb from "../indexedDB";

export function useIndexedDB<T>(storeName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData();
  }, [storeName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await idb.getAllItems(storeName);
      setData(result as T[]);
    } catch (err) {
      setError(err as Error);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Partial<T>) => {
    try {
      setLoading(true);
      await idb.addItem(storeName, item);
      await fetchData();
    } catch (err) {
      setError(err as Error);
      console.error("Error adding item:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: number, item: Partial<T>) => {
    try {
      setLoading(true);
      await idb.updateItem(storeName, { ...item, id });
      await fetchData();
    } catch (err) {
      setError(err as Error);
      console.error("Error updating item:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      setLoading(true);
      await idb.deleteItem(storeName, id);
      await fetchData();
    } catch (err) {
      setError(err as Error);
      console.error("Error deleting item:", err);
    } finally {
      setLoading(false);
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

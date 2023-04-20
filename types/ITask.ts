export interface ITask {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
}

export enum Status {
  Nueva = "Nueva",
  EnProceso = "En Proceso",
  Finalizada = "Finalizada",
  NonSelect = "Estado",
}

export const statusOrder = {
  [Status.Finalizada]: 0,
  [Status.EnProceso]: 1,
  [Status.Nueva]: 2,
  [Status.NonSelect]: -1, // solo lo agrego para poder utilizar el mismo type (enum)
};

export enum Priority {
  Alta = "Alta",
  Media = "Media",
  Baja = "Baja",
  NonSelect = "Prioridad",
}

export const priorityOrder = {
  [Priority.Baja]: 0,
  [Priority.Media]: 1,
  [Priority.Alta]: 2,
  [Priority.NonSelect]: -1, // solo lo agrego para poder utilizar el mismo type (enum)
};
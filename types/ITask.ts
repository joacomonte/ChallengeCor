export interface ITask {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  status: Status;
}

export enum Status {
  Nueva = "nueva",
  EnProceso = "en proceso",
  Finalizada = "finalizada",
  NonSelect = "-",
}

export enum Priority {
  Alta = "alta",
  Media = "media",
  Baja = "baja",
  NonSelect = "-",
}
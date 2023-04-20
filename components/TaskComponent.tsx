import React, { useState } from "react";
import thisStyle from "./Task.module.css"
import { Priority, Status, ITask } from "../types/ITask";

type TaskProps = {
  task: ITask;
  editedData: (priority: Priority, status: Status, id: number) => void;
  onDelete: () => void;
};

const Task = ({ task, editedData, onDelete }: TaskProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  const toggleIsEditable = () => {
    setIsEditable(!isEditable);
  }

  const submitChanges = () => {
    editedData(priority, status, task.id);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div className={thisStyle.task}>
        <div className={thisStyle.typesContainer}>
        {isEditable ? (
            <>
            <p>Prioridad: </p>
            <select className= {thisStyle.customSelect} value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                <option value="">-</option>
                <option value={Priority.Alta}>Alta</option>
                <option value={Priority.Media}>Media</option>
                <option value={Priority.Baja}>Baja</option>
            </select>
            <p>Prioridad: </p>
            <select className= {thisStyle.customSelect} value={status} onChange={(e) => setStatus(e.target.value as Status)}>
                <option value="">-</option>
                <option value={Status.Nueva}>Nueva</option>
                <option value={Status.EnProceso}>En Proceso</option>
                <option value={Status.Finalizada}>Finalizada</option>
            </select>
            </>
        ) : (
            <>
            <p>Prioridad: {task.priority}</p>
            <p>Estado: {task.status}</p>
            </>
        )}
        </div>
      <div className={thisStyle.title}>
        <p>Titulo: <b>{task.title}</b></p>
        <h2></h2>
      </div>
      <p>Descripción:</p>
      <p>{task.description}</p>
      <div className={thisStyle.taskButtons}>
        {isEditable ? (
          <div className={thisStyle.saveAndClose}>
            <button onClick={toggleIsEditable}>Cancelar</button>
            <button className={thisStyle.saveBtn} onClick={() => {
                submitChanges();
                toggleIsEditable();
            }}>Guardar</button>
          </div>
        ) : (
          <button onClick={toggleIsEditable}>Editar</button>
        )}
        <button className={thisStyle.deleteBtn} onClick={handleDeleteClick}>Eliminar</button>
      </div>
    </div>
  );
};

export default Task;

import {useEffect, useState } from "react";
import {ITask, Priority, Status} from '../types/ITask';
import Task from '../components/TaskComponent';

const priorityOrder = {
  [Priority.Alta]: 3,
  [Priority.Media]: 2,
  [Priority.Baja]: 1,
  [Priority.NonSelect]: -1, // solo lo agrego para poder utilizar el mismo type (enum)
};

const statusOrder = {
  [Status.Nueva]: 3,
  [Status.EnProceso]: 2,
  [Status.Finalizada]: 1,
  [Status.NonSelect]: -1, // solo lo agrego para poder utilizar el mismo type (enum)
};

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.NonSelect);
  const [status, setStatus] = useState<Status>(Status.NonSelect);
  const [taskIdCounter, setTaskIdCounter] = useState<number>(0);
  const [priorityChoosen, setPriorityChoosen] = useState<Priority>(Priority.NonSelect);
  const [statusChoosen, setStatusChoosen] = useState<Status>(Status.NonSelect);


  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        id: taskIdCounter, // id autogenerado
        name,
        description,
        priority,
        status,
      },
    ]);
    setName("");
    setDescription("");
    setPriority(Priority.NonSelect);
    setStatus(Status.NonSelect);
    setTaskIdCounter(taskIdCounter + 1); // incremento el id
  };


  const handleEditTask = (priority: Priority, status: Status, taskId: number): void => {
    setTasks(prevTasks => {
      return prevTasks.map(task => { 
        if (task.id === taskId) { // si es el id que se edita
          return {
            ...task,
            priority,
            status,
          };
        }
        return task; // si no es el id que se edita, no hago nada
      });
    });
  };

  useEffect(() => {
    console.log(tasks);
}, [tasks]);

function sortById(): void {
  const sortedTasks = [...tasks].sort((a, b) => {
    return a.id < b.id ? -1 : 1;
  });
  setTasks(sortedTasks);
}

function sortTasksByPriority(priorityChoosen: Priority): void {
  // spread operator -> para forzar el re-render y evitar el useEffect
  const sortedTasks = [...tasks].sort((a, b) => {
    // getter del index
    const aIndex = priorityOrder[a.priority];
    const bIndex = priorityOrder[b.priority];
    // misma prioridad? ordenar por id
    if (aIndex === bIndex) {
      return a.id < b.id ? -1 : 1;
    }
    // si elijo Baja. ordeno ascendente
    if (priorityChoosen === Priority.Baja) {
      return aIndex - bIndex;
    } else {
      // Sino descendente
      return bIndex - aIndex;
    }
  });
  setTasks(sortedTasks);
}

function sortTasksByStatus(statusChoosen: Status): void {
  const sortedTasks = [...tasks].sort((a, b) => {
    const aIndex = statusOrder[a.status];
    const bIndex = statusOrder[b.status];
    if (aIndex === bIndex) {
      return a.id < b.id ? -1 : 1;
    }
    if (statusChoosen === Status.Finalizada) {
      return aIndex - bIndex;
    } else {
      return bIndex - aIndex;
    }
  });
  setTasks(sortedTasks);
}


  // filtro los que no coinciden con el id
  const handleDeleteTask = (taskId: number): void => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId)); 
  }
  

return (
  <div className='appContainer'>
    <h2>Crear componente </h2>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    ></textarea>
    <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
      <option value="">-</option>
      <option value={Priority.Alta}>Alta</option>
      <option value={Priority.Media}>Media</option>
      <option value={Priority.Baja}>Baja</option>
    </select>
    <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
      <option value="">-</option>
      <option value={Status.Nueva}>Nueva</option>
      <option value={Status.EnProceso}>En proceso</option>
      <option value={Status.Finalizada}>Finalizada</option>
    </select>

    <button onClick={handleAddTask}>Add Task</button>
    <button onClick={ () => sortTasksByPriority(Priority.Alta)}>sort by priority</button>

    <h2>Filtrar por: </h2>
    <h4>Status</h4>
    <select value={statusChoosen} onChange={(e) => {
      const selectedStatus = e.target.value as Status;
      sortTasksByStatus(selectedStatus);
      setStatusChoosen(selectedStatus);
    }}>
      <option value="">-</option>
      <option value={Status.Nueva}>Nueva</option>
      <option value={Status.EnProceso}>En proceso</option>
      <option value={Status.Finalizada}>Finalizada</option>
    </select>

    <h4>Prioridad</h4>
    <select value={priorityChoosen} onChange={(e) => {
      const selectedPriority = e.target.value as Priority;
      sortTasksByPriority(selectedPriority);
      setPriorityChoosen(selectedPriority);
    }}>
      <option value="">-</option>
      <option value={Priority.Alta}>Alta</option>
      <option value={Priority.Media}>Media</option>
      <option value={Priority.Baja}>Baja</option>
    </select>

    <button onClick={sortById} >Clear Filter</button>

      {tasks && tasks.length > 0 ? (
      tasks.map((task, id) => (
      <Task key={task.id} task={task} editedData={(priority: Priority, status: Status) => handleEditTask(priority, status, task.id)} onDelete={() => handleDeleteTask(task.id)} />
      ))
        ) : (
      <p>No tasks available</p>
)}
  </div>
);
}



// // give the the order of the tasks based on the priority
// const priorityOrder = {
//   [Priority.Alta]: 3,
//   [Priority.Media]: 2,
//   [Priority.Baja]: 1,
//   [Priority.NonSelect]: -1, // add a value for NonSelect
// };

// // i filter NonSelect because i dont want to show NonSelect in the list
// const handleOrderByPriority = () => {
//   const sortedTasks = [...tasks].filter(task => task.priority !== Priority.NonSelect).sort(
//     (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
//   );
//   setTasks(sortedTasks);
// };

// // give the the order of the tasks based on the status
// const statusOrder = {
//   [Status.Nueva]: 1,
//   [Status.EnProceso]: 2,
//   [Status.Finalizada]: 3,
//   [Status.NonSelect]: -1, // add a value for NonSelect
// };


// const handleOrderByStatus = () => {
//   const sortedTasks = [...tasks].sort(
//     (a, b) => statusOrder[a.status] - statusOrder[b.status]
//   );
//   setTasks(sortedTasks);
// };


    {/* <button onClick={handleOrderByPriority}>Order by Priority</button>
    <button onClick={handleOrderByStatus}>Order by Status</button> */}
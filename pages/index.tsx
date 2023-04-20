
import {useState } from "react";
import {ITask, Priority, Status, statusOrder, priorityOrder} from '../types/ITask';
import Task from '../components/TaskComponent';
import ReactPaginate from 'react-paginate';


export default function TodoApp() {
  const [tasks, setTasks] = useState<ITask[]>([]); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.NonSelect);
  const [status, setStatus] = useState<Status>(Status.NonSelect);
  const [taskIdCounter, setTaskIdCounter] = useState<number>(0);
  const [priorityChoosen, setPriorityChoosen] = useState<Priority>(Priority.NonSelect);
  const [statusChoosen, setStatusChoosen] = useState<Status>(Status.NonSelect);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedItem: { selected: number }) => {
  setCurrentPage(selectedItem.selected);
};

const tasksPerPage = 2;
const startIndex = currentPage * tasksPerPage;
const endIndex = startIndex + tasksPerPage;

const displayedTasks = tasks.slice(startIndex, endIndex);


  const handleAddTask = () => {

    if (!title || priority === Priority.NonSelect || status === Status.NonSelect) {
      // list of fields not ok
      let fields = [];
      if (!title) fields.push("title");
      if (priority === Priority.NonSelect) fields.push("Prioridad");
      if (status === Status.NonSelect) fields.push("Estado");
      
      alert(`Completar los siguientes filtros: ${fields.join(", ")}`);
      return;
    }

    setTasks([
      ...tasks,
      {
        id: taskIdCounter, // id autogenerado
        title,
        description,
        priority,
        status,
      },
    ]);
    setTitle("");
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


function sortById(): void {
  const sortedTasks = [...tasks].sort((a, b) => {
    return a.id < b.id ? -1 : 1;
  });
  setTasks(sortedTasks);
  setPriorityChoosen(Priority.NonSelect);
  setStatusChoosen(Status.NonSelect);
}

function sortTasksByPriority(priorityChoosen: Priority): void {
  const sortedTasks = [...tasks].sort((a, b) => {
    // getter del index
    const aIndex = priorityOrder[a.priority];
    const bIndex = priorityOrder[b.priority];

    // si elijo Media, las tareas con media prioridad van primero
    if (priorityChoosen === Priority.Media) {
      if (a.priority === Priority.Media && b.priority !== Priority.Media) {
        return -1;
      } else if (a.priority !== Priority.Media && b.priority === Priority.Media) {
        return 1;
      }
    }
    // misma prioridad? ordenar por id
    if (aIndex === bIndex) {
      return a.id < b.id ? -1 : 1;
    }

    // si elijo Baja. ordeno ascendente
    if (priorityChoosen === Priority.Baja) {
      return aIndex - bIndex;
    } else {
      // Sino descendente (Alta)
      return bIndex - aIndex;
    }
  });
  setTasks(sortedTasks);
}


function sortTasksByStatus(statusChoosen: Status): void {
  const sortedTasks = [...tasks].sort((a, b) => {
    // getter del index
    const aIndex = statusOrder[a.status];
    const bIndex = statusOrder[b.status];

    // si elijo EnProceso, las tareas EnProceso van primero
    if (statusChoosen === Status.EnProceso) {
      if (a.status === Status.EnProceso && b.status !== Status.EnProceso) {
        return -1;
      } else if (a.status !== Status.EnProceso && b.status === Status.EnProceso) {
        return 1;
      }
    }

    // misma prioridad? ordenar por id
    if (aIndex === bIndex) {
      return a.id < b.id ? -1 : 1;
    }

    // si elijo Finalizada. ordeno ascendente
    if (statusChoosen === Status.Finalizada) {
      return aIndex - bIndex;
    } else {
      // Sino descendente
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
  <div className="centerApp">
      <div className='appContainer'>
        <h1>ToDo App </h1>
        <div className="newTaskContainer">
          <div className="newTaskInputs">
            <input
              type="text"
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
              <option value="">Prioridad</option>
              <option value={Priority.Alta}>Alta</option>
              <option value={Priority.Media}>Media</option>
              <option value={Priority.Baja}>Baja</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
              <option value="">Estado</option>
              <option value={Status.Nueva}>Nueva</option>
              <option value={Status.EnProceso}>En proceso</option>
              <option value={Status.Finalizada}>Finalizada</option>
            </select>
          </div>

          <div className="newTaskTextarea">
            <textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <button className="addTaskBtn" onClick={handleAddTask}>Crear Tarea</button>


        <div className="filtersCcontainer">
          <h4>Filtrar por: </h4>
          <div className="filtersSelects">
            <div className="statusSelect">
              <p>Status</p>
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
            </div>

            <div className="prioritySelect">
            <p>Prioridad</p>
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
            </div>

            <button className="clearBtn" onClick={sortById} >Limpiar</button>
          </div>
        </div>

        {tasks.length > 0 ? (
          displayedTasks.map((task, id) => (
            <Task
              key={task.id}
              task={task}
              editedData={(priority: Priority, status: Status) =>
                handleEditTask(priority, status, task.id)
              }
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))
        ) : (
          <p className="noTasks" >No hay tareas pendientes, disfruta del día!</p>
        )}

        {tasks.length > 2 && (
        <ReactPaginate
          pageCount={Math.ceil(tasks.length / tasksPerPage)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page-item"
          previousLabel="Atras"
          nextLabel="Siguiente"
          breakClassName="break-me"
          breakLabel="..."
        />
        )}

      </div>
  </div>

);
}

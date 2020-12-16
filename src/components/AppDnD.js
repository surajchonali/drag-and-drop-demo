import React, {useState, useReducer} from "react";
import {dndReducer} from './dndReducer'
import './DragDrop.css'

function AppDnD() {
    const initialState ={
        tasks: [{name:"Item 1", category:"area1"},
                {name:"Item 2", category:"area1"},
                {name:"Item 3", category:"area1"},
                ]
    }

    const [state, dispatch] = useReducer(dndReducer, initialState)

      const onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    const onDragOver = (ev) => {
        ev.preventDefault();
    }

    const onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let items = state.tasks.filter((task) => {
           if (task.name === id) {
               task.category = cat;
           }
           return task;
       });

       dispatch({
           type:'DRAG_DROP',
           payload: items
       })
       
    }

    var areas = {
        area1: [],
        area2: []
    }

    state.tasks.forEach ((task) => {
        areas[task.category].push(
            <div key={task.name} 
                onDragStart = {(e) => onDragStart(e, task.name)}
                draggable
                className="draggable"
            >
                <h4>{task.name}</h4>
            </div>
        );
    });

  return (
    <div className="App">
      <h2 className="header">Drag and Drop Component Demo</h2>
      <div className="container-drag">
        <div
          className="cardDD"
          onDragOver={(e) =>onDragOver(e)}
          onDrop={(e) => {
            onDrop(e, "area1");
          }}
        >
          <span className="task-header">
            <h3>Area 1</h3>
          </span>
          {areas.area1}
        </div>
        <div
          className="cardDD"
          onDragOver={(e) =>onDragOver(e)}
          onDrop={(e) =>onDrop(e, "area2")}
        >
          <span className="task-header">
            <h3>Area 2</h3>
          </span>
          {areas.area2}
        </div>
      </div>
    </div>
  );
}

export default AppDnD;

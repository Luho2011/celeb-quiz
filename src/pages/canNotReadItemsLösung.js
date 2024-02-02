import React from 'react'
import "./Zoom.css";
import list from "../Sort.json";
import {useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";


function Zoom() {

  const [words, setWords] = useState(list);
  const [remainingWords, setRemainingWords] = useState([]);
  const [solutionList, setSolutionList] = useState([]);
  const [solution, setSolution] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  
 
  const handleNext = () => {
    console.log(words.length)
    const random = Math.floor(Math.random() * words.length);
    setRemainingWords(words[random].items);
    const newSolution = remainingWords.slice();
    setSolution(newSolution);
    setSolutionList([]);
    setShowSolution(true);
    remove(words[random].ids);
  };

  const remove = (id) => {
    const newList = words.filter(item => item.ids !== id);
    setWords(newList);
  }

  const sortedSolution = solution.slice().sort((a, b) => a.id - b.id);


  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
  
    if (!destination) {
      return;
    }
  
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
  
    if (source.droppableId !== destination.droppableId) {
  
      const solution = [...solutionList];
  
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
  
      const [removedItem] = remainingWords.splice(sourceIndex, 1);
  
      if (removedItem.category !== destination.droppableId.toString()) {
        solution.splice(destinationIndex, 0, removedItem);
  
        // Check the position validity after each drag
        const isValidPosition = checkPositionValidity(removedItem, destinationIndex);
        setDraggedItemIndex(isValidPosition ? null : destinationIndex);
        
          if (!isValidPosition) {
            console.error('Invalid position!'); 
            
          } 
        setSolutionList(solution);        
      }      
    }
  };

  const checkPositionValidity = (movedItem, destinationIndex) => {
    const itemsAbove = solutionList.slice(0, destinationIndex);
    const itemsBelow = solutionList.slice(destinationIndex);
  
    // Check the validity of the position
    const isValidPosition =
      (itemsAbove.every(item => item.id < movedItem.id) || itemsAbove.length === 0) &&
      (itemsBelow.every(item => item.id > movedItem.id) || itemsBelow.length === 0);
  
    return isValidPosition;
  };

 
  return (
    <div className="zoom">
      <div className='zoom__buttons'>
         <button className='play_button' onClick={handleNext}>Next</button>
         <button className='play_button' onClick={() => setShowSolution(!showSolution)}>Solution</button>
      </div>   

       <DragDropContext onDragEnd={onDragEnd}>           
                          <div className='boxes'>
                            <Droppable droppableId="a" type="droppableItem">
                              {(provided) => (
                                <div ref={provided.innerRef}>
                                <div className="zoom__words">                   
                                 {remainingWords.map((item, index) => (                                                        
                                    <Draggable
                                      draggableId={item.id}
                                      key={item.id}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                           <div className='words'>
                                              <h1>{item.name}</h1>
                                           </div>                                    
                                        </div>
                                      )}
                                    </Draggable>                                
                                  ))}
                                  {provided.placeholder}                            
                               </div>
                               </div>
                             )}
                            </Droppable> 
                        
                          <Droppable droppableId="b" type="droppableItem">
                             {(provided) => (
                               <div ref={provided.innerRef}>
                                  <div className='zoom__list'> 
                                      {solution.map((item) => (
                                        <h1>{item.category1}</h1>
                                      ))}
                                     {solutionList                             
                                       .map((item, index) => (
                                        <Draggable
                                          draggableId={item.id}
                                          key={item.id}
                                          index={index} 
                                        >
                                          {(provided) => (
                                            <div                                          
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            >
                                              <div className={index === draggedItemIndex ? "wordsInvalid" : "wordsValid"}>
                                                 <h1>{item.name}</h1>                                                                                                                                                                                                                                                                                    
                                              </div> 
                                            </div>
                                          )}                                                                                                                
                                      </Draggable>  
                                    ))}
                                     {provided.placeholder}
                                  </div>                                            
                               </div>
                                 )}
                            </Droppable>   
                          <div className='zoom__solution'>
                                {sortedSolution.map((item) => (
                                  <div className={showSolution ? "no__solution" : "wordsValid"}>
                                      <h1>{item.name}</h1>
                                  </div>                      
                                ))}
                          </div>                                                                                                                                                                                       
              </div>              
        </DragDropContext>    
    </div>      
  );
  
}

export default Zoom







import React from 'react'
import "./Zoom.css";
import list from "../Sort.json";
import {useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";


function Zoom() {

  const [words, setWords] = useState(list);
  const [remainingWords, setRemainingWords] = useState([]);
  const [solutionList, setSolutionList] = useState([]);
  const [solution, setSolution] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  
 
  const handleNext = () => {
    console.log(words.length)
    const categoryId = Math.floor(Math.random() * words.length);
    const selectedCategory = words.find((data) => data.ids === categoryId);
    setRemainingWords(selectedCategory.items);
    const newSolution = selectedCategory.items.slice();
    setSolution(newSolution);
    setSolutionList([]);
    setShowSolution(true);
    remove(selectedCategory.ids);
  };

  const remove = (id) => {
    const newList = words.filter(item => item.ids !== id);
    setWords(newList);
  }

  const sortedSolution = solution.slice().sort((a, b) => a.id - b.id);


  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
  
    if (!destination) {
      return;
    }
  
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
  
    if (source.droppableId !== destination.droppableId) {
  
      const solution = [...solutionList];
  
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
  
      const [removedItem] = remainingWords.splice(sourceIndex, 1);
  
      if (removedItem.category !== destination.droppableId.toString()) {
        solution.splice(destinationIndex, 0, removedItem);
  
        // Check the position validity after each drag
        const isValidPosition = checkPositionValidity(removedItem, destinationIndex);
        setDraggedItemIndex(isValidPosition ? null : destinationIndex);
        
          if (!isValidPosition) {
            console.error('Invalid position!'); 
            
          } 
        setSolutionList(solution);        
      }      
    }
  };

  const checkPositionValidity = (movedItem, destinationIndex) => {
    const itemsAbove = solutionList.slice(0, destinationIndex);
    const itemsBelow = solutionList.slice(destinationIndex);
  
    // Check the validity of the position
    const isValidPosition =
      (itemsAbove.every(item => item.id < movedItem.id) || itemsAbove.length === 0) &&
      (itemsBelow.every(item => item.id > movedItem.id) || itemsBelow.length === 0);
  
    return isValidPosition;
  };

 
  return (
    <div className="zoom">
      <div className='zoom__buttons'>
         <button className='play_button' onClick={handleNext}>Next</button>
         <button className='play_button' onClick={() => setShowSolution(!showSolution)}>Solution</button>
      </div>   

       <DragDropContext onDragEnd={onDragEnd}>           
                          <div className='boxes'>
                            <Droppable droppableId="a" type="droppableItem">
                              {(provided) => (
                                <div ref={provided.innerRef}>
                                <div className="zoom__words">                   
                                 {remainingWords.map((item, index) => (                                                        
                                    <Draggable
                                      draggableId={item.id}
                                      key={item.id}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                           <div className='words'>
                                              <h1>{item.name}</h1>
                                           </div>                                    
                                        </div>
                                      )}
                                    </Draggable>                                
                                  ))}
                                  {provided.placeholder}                            
                               </div>
                               </div>
                             )}
                            </Droppable> 
                        
                          <Droppable droppableId="b" type="droppableItem">
                             {(provided) => (
                               <div ref={provided.innerRef}>
                                  <div className='zoom__list'> 
                                      {solution.map((item) => (
                                        <h1>{item.category1}</h1>
                                      ))}
                                     {solutionList                             
                                       .map((item, index) => (
                                        <Draggable
                                          draggableId={item.id}
                                          key={item.id}
                                          index={index} 
                                        >
                                          {(provided) => (
                                            <div                                          
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            >
                                              <div className={index === draggedItemIndex ? "wordsInvalid" : "wordsValid"}>
                                                 <h1>{item.name}</h1>                                                                                                                                                                                                                                                                                    
                                              </div> 
                                            </div>
                                          )}                                                                                                                
                                      </Draggable>  
                                    ))}
                                     {provided.placeholder}
                                  </div>                                            
                               </div>
                                 )}
                            </Droppable>   
                          <div className='zoom__solution'>
                                {sortedSolution.map((item) => (
                                  <div className={showSolution ? "no__solution" : "wordsValid"}>
                                      <h1>{item.name}</h1>
                                  </div>                      
                                ))}
                          </div>                                                                                                                                                                                       
              </div>              
        </DragDropContext>    
    </div>      
  );
  
}

export default Zoom
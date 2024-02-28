import React, { useEffect } from 'react'
import "./Belong.css";
import {useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {db} from '../firebase'
import {getDocs, collection, collectionGroup} from 'firebase/firestore'

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function Belong() {

  const [wordsTest, setWordsTest] = useState([]);
  const [wordsBelong, setWordsBelong] = useState([]);
  const [solutionList, setSolutionList] = useState([]);
  const [solution, setSolution] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [fetchData, setFetchData] = useState(false);
  const [newList, setNewList] = useState([]);
  const [usedNumbers, setUsedNumbers] = useState([]);


  useEffect(() => {
    const getCollectionSize = async () => {
      const rnd = getRandomNumber();
      const wordsCollection = collection(db, `sort/rvo0bgDUH9oHF6wlSE0q/${rnd}`);
      const wordsCollection2 = collection(db, `sort/gQCCfBS7HXdnnwDniuat/${rnd}`);
      const data = await getDocs(wordsCollection);
      
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      
      }));

      const data2 = await getDocs(wordsCollection2);
      
      const filteredData2 = data2.docs.map((doc) => ({
        ...doc.data(),
      
      }));

      setWordsTest(shuffleArray(filteredData));
      setWordsBelong(shuffleArray(filteredData2));
      const newSolution = filteredData.slice();
      setSolution(newSolution)
      console.log(filteredData)
      console.log(filteredData2)
      setSolutionList([]);
      setShowSolution(false);
      
    };
    getCollectionSize();
  }, [fetchData]);


  const getRandomNumber = () => {
    let rnd;
    do {
      rnd = Math.floor(Math.random() * 3) + 1;
    } while (usedNumbers.includes(rnd));
    setUsedNumbers(prevState => [...prevState, rnd]);
    return rnd;
  };
  

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
  
      const [removedItem] = wordsTest.splice(sourceIndex, 1);
  
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
      <div className='belong__buttons'>
         <button className='belong__play_button' onClick={() => setFetchData(!fetchData)}>Next</button>
         <button className='belong__play_button' onClick={() => setShowSolution(!showSolution)}>Solution</button>
      </div>   
           
       <DragDropContext onDragEnd={onDragEnd}>           
                          <div className='boxes'>                                                          
                            <Droppable droppableId="a" type="droppableItem">
                              {(provided) => (
                                <div ref={provided.innerRef}>
                                <div className="zoom__words">                                 
                                 {wordsTest.map((item, index) => (                                                                                         
                                    <Draggable
                                      draggableId={(item.id || index).toString()}
                                      key={item.id || index}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >                                                                                                                                                                                              
                                           <div className='words'>                                    
                                              <h2>{item.name}</h2>
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
                        
                         
                                  <div className='belong__list'> 
                                      {wordsBelong.map((item) => (            
                                        <div className='belong__words__div'>
                                          <div className='words'>
                                            <h2>{item.name}</h2>    
                                          </div>  
                                        </div>                                                                                     
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
                                              <div className={index === draggedItemIndex ? "belong__wordsInvalid" : "belong__wordsValid"}>
                                                 <h2>{item.name}</h2>                                                                                                                                                                                                                                                                                    
                                              </div> 
                                            </div>
                                          )}                                                                                                                
                                      </Draggable>  
                                    ))}
                                   
                                     
                                  </div>                                            
                               

                          <div className='zoom__solution'>
                                {sortedSolution.map((item) => (
                                  <div className={showSolution ? "no__solution" : "words__solution"}>
                                      <h1>{item.name} ({item.solution})</h1>                                    
                                  </div>                      
                                ))}
                          </div>                                                                                                                                                                                       
              </div>              
        </DragDropContext>    
    </div>      
  );
  
}


export default Belong
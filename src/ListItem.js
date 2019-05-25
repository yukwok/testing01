import React from 'react';



const ListItem = ({item, id, editTodo, deleteTodo, ghj,sdfsdf, sdfsf}) => {

  // console.log(item);



  return(
    <div>
      <li key={item.id} className="list-group-item">
                
          <button
            className="btn-sm mr-4 btn btn-info"
            onClick={editTodo}
          >U</button>
                
          {item.name}
                
          <button
            className="btn-sm ml-4 btn btn-danger"
            onClick={deleteTodo}
          >X</button>                          
              
        </li>

    </div>

  );

}

export default ListItem;

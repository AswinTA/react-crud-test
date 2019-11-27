import React from 'react';

const ListItem = (props) =>{

   return <li className='list-group-item'>
                <button className="btn btn-success btn-sm mr-5"
                  onClick={props.editToDo}>u</button>
                {props.item.name}
                <button className="btn btn-danger btn-sm ml-5"
                  onClick={props.deleteTodo}>x</button>
              </li>
}

export default ListItem;
import React from 'react';
import { deleteReminder } from '../api';
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`;

const Items = styled.div` 
    animation: 2s ${fadeIn} ease-in; 
    background: #6C22FF;
    padding: .5em;
    width: 50%;
    margin-right: 2em;
    border-radius: .8em;
    margin: 10px;
`;

const ItemsDate = styled.p`
    display:flex;
    color: #aaecf0;
    width: 100%;
    justify-content: left;
    font-size: 15px;
`;
const ItemTitle = styled.h2`
    display: flex ;
    animation: 2s ${fadeIn} ease-in;
    color: #aaecf0;
    width: 100%;
    justify-content: left;
    align-items: left;
    font-size: 25px;
`;


const ButtonDelete = styled.button`
    justify-content: center;
    align-items: center;
    animation: 2s ${fadeIn} ease-in;
    margin-right: 0 px;
    border-radius: 100%;
    width: 2.5rem;
    background: black;
    color: white;
    height: 2.5rem;
    display: auto;
    margin-left: 90%;
    
    overflow: hidden;
    &:hover,
  &:focus {
    color: red;
  }
  &:active {
    color: red;
  }
    border: 0px;
    transform: translate3d(0px, 0px, 0px);
`;

const ReminderItem = ({ reminder, fetchReminders }) => {
    const handleDelete = async () => {
        try {
            await deleteReminder(reminder.id);
            fetchReminders();
        }
        catch (error) {
            console.error('Erro ao deletar lembrete:', error);
        }
    };
    return (
        <Items>
            <ItemTitle> Tarefa:  {reminder.name}.</ItemTitle>
            <ItemsDate> Data:  {new Date(reminder.date).toLocaleDateString()} </ItemsDate>
            <ButtonDelete onClick={handleDelete}> X </ButtonDelete>
        </Items>
    );
};

export default ReminderItem;

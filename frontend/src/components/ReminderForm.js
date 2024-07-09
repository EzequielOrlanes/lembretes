import React, { useState } from 'react';
import { createReminder } from '../api';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  align-content: center;
`;

const Input = styled.input`
 background-color: #6C22FF;
  border: solid 3px grey;
  margin: 4px;
  width: 200px;
  height: 50px !importante ;
  border-radius: 10px;
  display: flex;
  justify-content: left;
  font-size: 25px;
  color-items: white;
  padding: 10px;
`;

const InputDate = styled.input`
background-color: #6C22FF;
  border: solid 3px grey;
  margin: 4px;
  width: 200px;
  height: 50px !importante ;
  border-radius: 10px;
  display: flex;
  justify-content: left;
  font-size: 25px;
  color: black;
  padding: 10px;
`;


const Button = styled.button`
 background-color: black;
  border: solid 3px grey;
  margin: 4px;
  width: 200px;
  height: 60px;
  border-radius: 10px;
  display: inline;
  justify-content: left;
  font-size: 25px;
  color: White;
  &:hover,
  &:focus {
    color: red;
  }
  &:active {
    color: red;
  }
  padding: 10px;
  cursor: pointer;
  `;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const ReminderForm = ({ fetchReminders }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');



  const validate = () => {
    if (!name) {
      setError('O campo "Nome" deverá estar preenchido');
      return false;
    }
    if (!date) {
      setError('O campo "Data" deverá estar preenchido');
      return false;
    }
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate <= today) {
      setError('A data deve estar no futuro');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      try {
        await fetch('http://localhost:5000/api/reminders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, date: formattedDate }),
        });
        fetchReminders();
        setName('');
        setDate('');
      } catch (error) {
        console.error('Erro ao adicionar lembrete:', error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Lembrete..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <InputDate
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Button type="submit"> Criar Tarefa</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};

export default ReminderForm;

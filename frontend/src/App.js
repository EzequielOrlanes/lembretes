import React, { useState, useEffect } from 'react';
import { getReminders } from './api';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import './App.css';
import styled from 'styled-components';

const AppContainer = styled.div`
    display: row;
    justify-content: center;
    text-align: center;
  
`;

const ReminderTitle = styled.h2`
display: flex;
  font-size: 2.5em;
  color: white;
  justify-content: left;
`;


const App = () => {
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    const response = await getReminders();
    setReminders(response.data);
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <AppContainer>
      <ReminderTitle>Meus Lembretes</ReminderTitle>
      <ReminderForm fetchReminders={fetchReminders} />
      <ReminderList reminders={reminders} fetchReminders={fetchReminders} />
    </AppContainer>
  );
};

export default App;

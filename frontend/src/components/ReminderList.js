import React from 'react';
import ReminderItem from './ReminderItem';
import styled from 'styled-components';

const TitleList = styled.h2`
display: flex;
justify-content: left;
`;
const ReminderList = ({ reminders, fetchReminders }) => {
    const groupedReminders = reminders.reduce((acc, reminder) => {
        const date = reminder.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(reminder);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedReminders).sort((a, b) => new Date(a) - new Date(b));
    return (
        <div>
            <TitleList> Lista de Lembretes </TitleList>
            {sortedDates.map((date) => (
                <div key={date}>
                    <h3>{new Date(date).toLocaleDateString()}</h3>
                    <ul>
                        {groupedReminders[date].map((reminder) => (
                            <ReminderItem key={reminder.id} reminder={reminder} fetchReminders={fetchReminders} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default ReminderList;
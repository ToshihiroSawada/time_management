/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DTS = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(true);

  const onChange = (_event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'android');
    setDate(currentDate);
  };

  return (
    <View>
      <DateTimePicker
        testID="showTimepicker"
        value={date}
        mode={mode}
        is24Hour
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

export default DTS;

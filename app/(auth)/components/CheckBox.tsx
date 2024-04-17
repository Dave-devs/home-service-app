import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface CheckboxProps {
  onChange: (isChecked: boolean) => void;
}

export default function CheckBox({ onChange }: CheckboxProps) {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <TouchableOpacity onPress={handleToggle}>
      {isChecked ? (
        <MaterialIcons name="check-box" size={20} color={Colors.primary} />
      ) : (
        <MaterialIcons name="check-box-outline-blank" size={20} color={Colors.primary} />
      )}
    </TouchableOpacity>
  );
}
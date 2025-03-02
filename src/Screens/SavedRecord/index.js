import * as React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

function SavedRecordScreen({ route }) {
  const entryData = route?.params?.entryData || {};
  const { roomNo, user, entryDate, entryTime } = entryData;

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (roomNo && user && entryDate && entryTime) {
      setEntries((prevEntries) => {
        const existingEntryIndex = prevEntries.findIndex(
          (entry) => entry.roomNo === roomNo && entry.exitTime === null
        );

        if (existingEntryIndex !== -1) {
          // If the user is inside the room, update the exit time
          return prevEntries.map((entry, index) =>
            index === existingEntryIndex ? { ...entry, exitTime: entryTime } : entry
          );
        } else {
          // If the user re-enters after exiting, create a new entry
          return [...prevEntries, { roomNo, user, entryDate, entryTime, exitTime: null }];
        }
      });
    }
  }, [entryData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visited Rooms</Text>

      {entries.length > 0 ? (
        <FlatList
          data={entries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>User: {item.user}</Text>
              <Text style={styles.cardText}>User: {item.roomNo}</Text>

              <Text style={styles.cardText}>Entry Date: {item.entryDate}</Text>
              <Text style={styles.cardText}>Entry Time: {item.entryTime}</Text>
              {item.exitTime ? (
                <Text style={styles.cardText}>Exit Time: {item.exitTime}</Text>
              ) : (
                <Text style={[styles.cardText, { color: 'red' }]}>{item.user} is inside Classroom: {roomNo}</Text>
              )}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noEntryText}>No entry done</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  noEntryText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SavedRecordScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEpisodes();
  }, [page]);

  const fetchEpisodes = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
      setEpisodes(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.episodeItem}>
            <Text style={styles.episodeText}>{item.name}</Text>
            <Text style={styles.episodeText}>{item.air_date}</Text>
          </View>
        )}
      />
      <View style={styles.pagination}>
        <Button title="Prev" onPress={prevPage} disabled={page === 1} />
        <Text>{page}/{totalPages}</Text>
        <Button title="Next" onPress={nextPage} disabled={page === totalPages} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  episodeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  episodeText: {
    fontSize: 18,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default App;

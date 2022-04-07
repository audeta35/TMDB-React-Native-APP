/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import { Card, Text } from '@ui-kitten/components';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const image_url = 'https://image.tmdb.org/t/p/w500'
const public_api = 'https://api.themoviedb.org/4'
const api_key = '9384a7a27ff139b026867f39e639fd98'

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState([])
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getApi = async () => {
    let url = `${public_api}/list/1?api_key=${api_key}`
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      if (res.data) {
        console.group('api tmdb')
        console.log('data', res?.data?.results)
        console.groupEnd()
        setData(res?.data?.results)
        console.log('data nya', data)
      }
    })
  }

  useEffect(() => {
    getApi();
  }, [])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View style={styles?.sectionContainer}>
          {
            data ?
              data.map((row, index) => (
                <View key={index} style={styles.sectionCard}>
                  <Card header={() => (
                    <View style={styles?.sectionContainer}>
                      <Image 
                        style={styles.tinyLogo}
                        source={{
                          uri: `${image_url + row?.backdrop_path}`
                        }}
                      />
                      <Text category='h6'>{row?.original_title}</Text>
                      <Text category='s1'>{row?.overview}</Text>
                    </View>
                  )}>
                  </Card>
                </View>
              ))
              : <Text>Data Not Found</Text>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  sectionCard: {
    margin: 10
  },
  sectionCardHeader: {},
  
  tinyLogo: {
    width: 250,
    height: 150,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default Home;

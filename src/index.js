/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Colors, Button } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import { SetIsLoadingState } from '../redux/actions/app';
import { SetListMovie } from '../redux/actions/list';

const image_url = 'https://image.tmdb.org/t/p/w500'
const public_api = 'https://api.themoviedb.org/4'
const api_key = '9384a7a27ff139b026867f39e639fd98'

const Home = () => {

  const dispatch = useDispatch();
  const StateData = useSelector((state) => state);
  const isDarkMode = useColorScheme() === 'dark';
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [page, setPage] = useState(1);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getApi = async (page) => {
    let url = `${public_api}/list/1?page=${page}&api_key=${api_key}`
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      if (res.data) {
        // console.group('api tmdb')
        // console.log('data', res?.data?.results)
        // console.groupEnd()
        // console.log('data nya', data)
        dispatch(SetListMovie(res?.data))

      }
      dispatch(SetIsLoadingState(false))
    })
  }

  useEffect(() => {
    getApi();
    // console.log("state redux: ", StateData)
  }, [])

  const getModalDetail = (row) => {
    // console.log('row', row)
    setDetail(row)
    setShowModal(true)
  }

  const handleChangePage = (num) => {
    // console.log("num", num)
    dispatch(SetIsLoadingState(true))
    setPage(num)
    getApi(num);
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ height: 70, backgroundColor: 'black', alignItems: 'center' }}>
        <Title style={{ marginTop: 15 }}>TMDB APP</Title>
      </View>

      <View style={{ flex: 1, backgroundColor: 'maroon', alignContent: 'stretch' }}>
        <ScrollView>
          <Modal
            animationType="slide"
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
          >
            <View>
              <Image source={{
                uri: `${image_url + detail?.backdrop_path}`
              }}
                style={{ width: 500, height: 300 }} />
            </View>
            <ScrollView style={{ marginHorizontal: 20, marginTop: 10 }}>
              <Title style={{ color: 'grey' }}>{detail?.title}</Title>
              <Paragraph style={{ color: 'grey' }}><Text style={{ color: 'black' }}>Tanggal Rilis</Text>: {detail?.release_date}</Paragraph>
              <Paragraph style={{ color: 'grey' }}><Text style={{ color: 'black' }}>Rating</Text>: {detail?.vote_average} dari {detail?.vote_count} ulasan</Paragraph>
              <Paragraph style={{ color: 'grey' }}><Text style={{ color: 'black' }}>Deskripsi</Text>: {detail?.overview}</Paragraph>
            </ScrollView>
            <View style={{ marginBottom: 20 }}>
              <Button color="maroon" onPress={() => setShowModal(false)}>Kembali</Button>
            </View>
          </Modal>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start', // if you want to fill rows left to right
            // backgroundColor: 'green',
          }}>
            {
              !StateData.app.isLoading ?
                StateData?.list?.total_results !== 0 ?
                  <Fragment>
                    {
                      StateData?.list?.results?.map((row, index) => (
                        <View key={index} style={{ width: 200, margin: 2, flexBasis: 'auto' }}>
                          <Card onPress={() => getModalDetail(row)}>
                            <Card.Cover source={{ uri: `${image_url + row?.poster_path}` }} />
                            <Card.Content style={{ alignItems: 'center', paddingTop: 10 }}>
                              <Paragraph>Info</Paragraph>
                            </Card.Content>
                          </Card>
                        </View>
                      ))
                    }
                    <View style={{ width: 400, marginHorizontal: 10, marginVertical: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                      <View style={{ marginHorizontal: 8 }}>
                        <Text>Halaman ke {page} dari {StateData?.list?.total_pages} halaman</Text>
                      </View>

                      <View style={{ marginHorizontal: 8 }}>
                        <Text>Total Film: {StateData?.list?.total_results}</Text>
                      </View>

                    </View>
                  </Fragment>
                  : (
                    <View style={{ flex: 1, marginTop: 250, alignItems: 'center' }}>
                      <Title>Kosong</Title>
                    </View>
                  )
                :
                <View style={{ width: 400, marginVertical: 250, alignItems: 'center' }}>
                  <ActivityIndicator animating={true} size="large" color={Colors.white800} />
                  <Title>Loading</Title>
                </View>
            }
          </View>
        </ScrollView>
      </View>
      <View style={{
        backgroundColor: 'maroon', 
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        {
          StateData.app.isLoading ? null :
            (
              <Fragment>
                <View style={{ width: 200 }}>
                  {
                    page !== 1 ? (<Button mode="outlined" color="white" onPress={() => handleChangePage(page - 1)}>Kembali</Button>) : null
                  }
                </View>
                <View style={{ width: 200 }}>
                  {
                    page === StateData?.list?.total_pages ? null : (<Button mode="outlined" color="white" onPress={() => handleChangePage(page + 1)}>Selanjutnya</Button>)
                  }
                </View>
              </Fragment>
            )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default Home;

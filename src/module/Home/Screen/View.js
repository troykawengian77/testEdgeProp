import React, { useState } from 'react';
import { useEffect } from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentWeather, getListForecast } from '../homeAction';
import { GET_CURRENT_WEATHER_SUCCESS, GET_LIST_FORECAST_SUCCESS } from '../homeConst';
import styles from './Style'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import FOIcon from 'react-native-vector-icons/Fontisto'
import Color from '../../../config/Color';
import { data } from './utils/data';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

const Home = () => {
  const dispatch = useDispatch();
  const fetchResult = useSelector(state => state.weathers);

  const [current, setCurrent] = useState(null)
  const [forecasts, setForecasts] = useState(data)

  useEffect(() => {
    dispatch(getCurrentWeather())
    dispatch(getListForecast())
  }, [])

  useEffect(() => {
    switch (fetchResult.action) {
      case GET_CURRENT_WEATHER_SUCCESS:
        setCurrent(fetchResult.listCurrent)
        break;
      case GET_LIST_FORECAST_SUCCESS:
        setForecasts(fetchResult.listForecast)
        break;
    }

  }, [fetchResult.action])

  return (
    <ScrollView>
      <View style={styles.header}>
        <ImageBackground style={styles.headerBg} source={require('../../../assets/images/header.jpg')}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              {current?.name}
            </Text>
          </View>
          <View style={styles.row1}>
            <View>
              <Image style={styles.row1Icon} source={{ uri: `https://openweathermap.org/img/wn/${current?.weather[0]?.icon}@4x.png` }} />
            </View>
            <View style={styles.row1Label}>
              <Text style={styles.row1Text}>{Math.floor(current?.main?.temp)}&deg;</Text>
            </View>
          </View>
          <View style={styles.row1}>
            <View style={styles.left}>
              <FAIcon color={Color.grey} name='long-arrow-up' />
              <Text style={styles.leftText}>{Math.floor(current?.main?.temp_max)}&deg;</Text>
            </View>
            <View style={[styles.left, { marginLeft: 10 }]}>
              <FAIcon color={Color.grey} name='long-arrow-down' />
              <Text style={styles.leftText}>{Math.floor(current?.main?.temp_min)}&deg;</Text>
            </View>
          </View>
          <Text style={styles.descText}>{current?.weather[0]?.description}</Text>
        </ImageBackground>
        <View style={styles.containerList}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>NEXT 14 DAYS</Text>
            {
              forecasts &&
              forecasts.map((el, ek) => {
                return (
                  <View style={styles.box}>
                    <Collapse style={styles.accordion}>
                      <CollapseHeader>
                        <View style={styles.accordionHeader}>
                          <View style={styles.accordionHeaderLeft}>
                            <FOIcon name={el.icon} color={Color.black} size={28} />
                            <View style={{ marginLeft: 10 }}>
                              <Text style={styles.accordionHeaderTitle}>{el.title}</Text>
                              <Text style={styles.accordionHeaderDesc}>{el.description}</Text>
                            </View>
                          </View>
                          <View style={styles.accordionHeaderRight}>
                            <View style={styles.accordionLabelRight}>
                              <FAIcon color={Color.darkGrey} name='long-arrow-up' size={16} />
                              <Text style={[styles.accordionHeaderTitle, { marginLeft: 2 }]}>{el.max}&deg;</Text>
                            </View>
                            <View style={styles.accordionLabelRight}>
                              <FAIcon color={Color.darkGrey} name='long-arrow-down' size={16} />
                              <Text style={[styles.accordionHeaderTitle, { marginLeft: 2 }]}>{el.min}&deg;</Text>
                            </View>
                          </View>
                        </View>
                      </CollapseHeader>
                      <CollapseBody>
                        <View style={styles.accordionBody}>
                          {
                            el.detail.map((val, key) => {
                              return (
                                <View style={{marginHorizontal: 20, alignItems: 'center'}}>
                                  <FOIcon color={Color.darkGrey} name={val.icon} size={20} />
                                  <Text style={styles.accordionHeaderDesc}>{val.name}</Text>
                                  <Text style={[styles.accordionHeaderTitle]}>{val.value}</Text>
                                </View>
                              )
                            })
                          }
                        </View>
                      </CollapseBody>
                    </Collapse>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Home
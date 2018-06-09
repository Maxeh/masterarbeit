import React, {PureComponent} from 'react';
import {StyleSheet, Image, Text, View, TouchableNativeFeedback} from 'react-native';
import {Card} from 'native-base';

export default class NewsCard extends PureComponent {
  render() {
    return (
      <View style={styles.wrapperView}>
          <Card>
            <View style={styles.cardRow}>
              <Text>helllo</Text>
            </View>
          </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    marginLeft: 7,
    marginRight: 7,
    marginBottom: -5
  },
  cardRow: {
    flex: 1,
    flexDirection: "row"
  },
  cardImage: {
    aspectRatio: 1.4,
    width: 100,
    alignSelf: "center"
  },
  cardText: {
    flex: 1,
    padding: 10,
    alignSelf: "center",
    color: '#111'
  }
});
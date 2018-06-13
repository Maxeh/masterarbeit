import React, {PureComponent} from 'react';
import {StyleSheet, Image, Text, View, TouchableNativeFeedback} from 'react-native';
import {Card} from 'native-base';

export default class NewsCard extends PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    return (
      <View style={styles.wrapperView}>
        <TouchableNativeFeedback onPress={this.onPress}>
          <Card>
            <View style={styles.cardRow}>
              <Image
                style={styles.cardImage}
                source={{uri: this.props.item.urlToImage}}
              />
              <Text style={styles.cardText}>
                {this.props.item.title}
              </Text>
            </View>
          </Card>
        </TouchableNativeFeedback>
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
    color: '#222'
  }
});
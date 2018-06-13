import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Content, Card, CardItem} from 'native-base';

export default class InfoScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Informationen',
    drawerLockMode: 'locked-closed',
  })

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Card>
            <CardItem>
              <Text style={styles.text}>
                Die App wurde für die Masterarbeit von Maximilian Ehbauer erstellt.
                Die App hilft dabei verschiedene Entwicklungsmethoden zur Erstellung mobiler Apps zu bewerten.
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text style={styles.text}>
                App Variante 5
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 5,
    paddingTop: 3
  },
  text: {
    color: '#222'
  },
});